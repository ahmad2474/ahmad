import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPortraitParticles, type PortraitSource } from "./portrait-particles";
import { createNetworkDestinations } from "./agentic-network";
import { createAgentDestinations, createInfrastructureDestinations, createProjectDestinations, type ProjectKey } from "./portfolio-forms";
import { createSceneAtmosphere } from "./scene-atmosphere";

export interface ParticleController { dispose: () => void; setPaused: (paused: boolean) => void }

const vertexShader = `
  attribute vec3 aScatter;
  attribute vec3 aColor;
  attribute vec3 aNormal;
  attribute vec3 aNetwork;
  attribute vec3 aAgent;
  attribute vec3 aInfrastructure;
  attribute vec3 aCloudOps;
  attribute float aNode, aFlow;
  attribute float aSize;
  attribute float aSeed;
  attribute vec3 aProfile;
  uniform float uTime, uProgress, uScale, uDpr, uRepulsion, uAgent, uInfrastructure, uGather, uPhase, uFlow, uProject, uContact;
  uniform vec2 uViewport, uCenter, uCursor, uPointer;
  uniform vec2 uNetworkCenter, uNetworkExtent;
  uniform vec2 uAgentCenter, uAgentExtent, uInfrastructureCenter, uInfrastructureExtent;
  uniform vec2 uProjectCenter, uProjectExtent;
  uniform vec3 uPivot;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    float spread = smoothstep(aSeed * .15, .82 + aSeed * .18, uProgress);
    // The supplied portrait is a depth surface, not a complete head scan.
    // Small turns plus lateral movement preserve presence without exposing missing sides.
    float ay = (uCursor.x * .095 + sin(uTime * .16) * .008) * aProfile.x;
    float ax = (-uCursor.y * .045) * aProfile.x;
    vec3 p = position - uPivot;
    p *= 1.0 + sin(uTime * .65 + aSeed * 2.) * .007;
    p.xz = mat2(cos(ay), -sin(ay), sin(ay), cos(ay)) * p.xz;
    p.yz = mat2(cos(ax), sin(ax), -sin(ax), cos(ax)) * p.yz;
    p += uPivot;
    vec2 home = uCenter + p.xy * uScale;
    home += uCursor * vec2(7., -4.) * aProfile.x;
    vec2 destination = aScatter.xy * uViewport * .84;
    destination += vec2(sin(uTime * .12 + aSeed * 30.), cos(uTime * .1 + aSeed * 20.)) * 12.;
    vec2 xy = mix(home, destination, spread);
    float arc = sin(spread * 3.14159);
    xy += vec2(-aScatter.y, aScatter.x) * arc * uScale * .9;
    vec2 away = xy - uPointer;
    float distanceToPointer = length(away);
    float influence = 1. - smoothstep(0., 85., distanceToPointer);
    xy += away / max(distanceToPointer, 1.) * influence * 16. * uRepulsion * (1. - spread);
    float depth = mix(p.z, aScatter.z, spread);
    float agentGather = smoothstep(aSeed * .12, .88 + aSeed * .12, uAgent);
    vec3 agentPoint = aAgent;
    agentPoint.y += sin(uTime * .5) * .003;
    vec2 agentXY = uAgentCenter + agentPoint.xy * uAgentExtent;
    agentXY += uCursor * vec2(24., -16.) * agentPoint.z;
    xy = mix(xy, agentXY, agentGather);
    depth = mix(depth, agentPoint.z, agentGather);
    float infraGather = smoothstep(aSeed * .14, .86 + aSeed * .14, uInfrastructure);
    vec3 infraPoint = aInfrastructure;
    if (abs(infraPoint.x) < .16 && abs(infraPoint.y) < .12) {
      float turn = uTime * .035;
      infraPoint.xz = mat2(cos(turn), -sin(turn), sin(turn), cos(turn)) * infraPoint.xz;
    }
    vec2 infraXY = uInfrastructureCenter + infraPoint.xy * uInfrastructureExtent;
    infraXY += uCursor * vec2(24., -16.) * infraPoint.z;
    xy = mix(xy, infraXY, infraGather);
    depth = mix(depth, infraPoint.z, infraGather);
    float gather = smoothstep(aSeed * .18, .82 + aSeed * .18, uGather);
    vec3 network = aNetwork;
    if (aNode < .5) {
      float turn = uTime * .035;
      network.xz = mat2(cos(turn), -sin(turn), sin(turn), cos(turn)) * network.xz;
    }
    vec2 networkXY = uNetworkCenter + network.xy * uNetworkExtent;
    networkXY += uCursor * vec2(20., -14.) * network.z;
    xy = mix(xy, networkXY, gather);
    depth = mix(depth, network.z, gather);
    float projectGather = smoothstep(aSeed * .14, .86 + aSeed * .14, uProject);
    vec3 projectPoint = aCloudOps;
    if (abs(projectPoint.x) < .18 && projectPoint.y > -.14 && projectPoint.y < .22) {
      float turn = uTime * .04;
      projectPoint.xz = mat2(cos(turn), -sin(turn), sin(turn), cos(turn)) * projectPoint.xz;
    }
    vec2 projectXY = uProjectCenter + projectPoint.xy * uProjectExtent;
    projectXY += uCursor * vec2(22., -16.) * projectPoint.z;
    xy = mix(xy, projectXY, projectGather);
    depth = mix(depth, projectPoint.z, projectGather);
    float contact = smoothstep(aSeed * .15, .85 + aSeed * .15, uContact);
    xy = mix(xy, destination, contact);
    depth = mix(depth, aScatter.z, contact);
    gl_Position = vec4(xy / (uViewport * .5), -depth * .1, 1.);
    gl_PointSize = aSize * uDpr * (1. + depth * .23) * mix(1., .78, spread) * mix(1., .6, max(agentGather, max(infraGather, gather)));
    vColor = aColor;
    float keyLight = .74 + .26 * max(dot(normalize(aNormal + vec3(.0001)), normalize(vec3(-.45, .7, 1.))), 0.);
    float portraitAlpha = (.19 + pow(aProfile.y, 1.2) * .71) * aProfile.z * keyLight;
    vAlpha = mix(portraitAlpha, .22 + aSeed * .14, spread);
    float eye = step(.07, abs(aAgent.x)) * (1. - step(.14, abs(aAgent.x))) * step(0., aAgent.y) * (1. - step(.09, aAgent.y));
    vAlpha = mix(vAlpha, .24 + aSeed * .15 + eye * .35, agentGather);
    vColor = mix(vColor, mix(vec3(.74, .57, 1.), vec3(.91, .8, 1.), aSeed), agentGather);
    vAlpha = mix(vAlpha, .22 + aSeed * .17, infraGather);
    vColor = mix(vColor, mix(vec3(.72, .6, 1.), vec3(.79, .88, 1.), aSeed), infraGather);
    float activation = 1. - smoothstep(.2, .8, abs(aNode - (uPhase + 1.)));
    float signal = 1. - smoothstep(.02, .14, abs(aFlow - uFlow));
    float networkAlpha = .16 + smoothstep(-.14, .16, network.z) * .2 + activation * .32 + signal * .65;
    vAlpha = mix(vAlpha, networkAlpha, gather);
    vColor = mix(vColor, mix(vec3(.72, .85, 1.), vec3(.91, .72, 1.), uPhase * .5), gather * max(activation * .6, signal));
    vColor = mix(vColor, vec3(.85, .76, 1.), gather * .25);
    vAlpha = mix(vAlpha, .2 + aSeed * .17 + sin(uTime * .45 + projectPoint.y * 12.) * .04, projectGather);
    vColor = mix(vColor, mix(vec3(.72, .54, 1.), vec3(.9, .8, 1.), aSeed), projectGather);
    vAlpha = mix(vAlpha, .018 + aSeed * .04, contact);
    vSeed = aSeed;
  }
`;
const fragmentShader = `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    vec2 point = (gl_PointCoord - .5) * 2.;
    float angle = vSeed * 6.283185;
    point = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * point;
    // Signed half-plane distance to a triangle. Hollow centers keep glyphs separate.
    float triangle = max(-point.y - .38, max(.866025 * point.x + .5 * point.y - .38, -.866025 * point.x + .5 * point.y - .38));
    float edge = max(fwidth(triangle), .025);
    float outside = 1. - smoothstep(-edge, edge, triangle);
    float inside = 1. - smoothstep(-.16 - edge, -.16 + edge, triangle);
    float core = outside - inside * .58;
    if (core < .01) discard;
    gl_FragColor = vec4(vColor, core * vAlpha * uOpacity);
  }
`;

const ambientVertexShader = `
  attribute float aSize, aSeed;
  attribute vec3 aColor;
  uniform float uTime, uProgress, uDpr;
  uniform vec2 uViewport, uCursor;
  varying vec3 vColor;
  varying float vAlpha, vSeed;
  void main() {
    vec2 xy = position.xy * uViewport;
    xy += vec2(sin(uTime * .09 + aSeed * 31.), cos(uTime * .07 + aSeed * 23.)) * (12. + position.z * 18.);
    xy += uCursor * vec2(18., -12.) * position.z;
    gl_Position = vec4(xy / (uViewport * .5), .5, 1.);
    gl_PointSize = aSize * uDpr;
    vColor = aColor;
    vAlpha = (.12 + position.z * .14) * mix(1., .35, smoothstep(.1, .8, uProgress));
    vSeed = aSeed;
  }
`;

/** Evenly distributed depth accents; independent of the authoritative portrait. */
function createAmbientGeometry(compact: boolean) {
  const columns = compact ? 8 : 16;
  const rows = compact ? 9 : 10;
  const count = columns * rows;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const seeds = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  let state = 9217;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  for (let i = 0; i < count; i++) {
    // Jittered cells cover the entire viewport, including the portrait's perimeter.
    // There is no central exclusion zone; these remain behind the portrait.
    const x = ((i % columns + .12 + random() * .76) / columns - .5) * .98;
    const y = ((Math.floor(i / columns) + .12 + random() * .76) / rows - .5) * .98;
    positions.set([x, y, .2 + random() * .8], i * 3);
    // Multipliers refer to the pre-enlargement portrait glyph, not the new 2x size.
    sizes[i] = (compact ? 3.5 : 5.2) * (3 + i % 3);
    seeds[i] = random();
    colors.set(i % 3 === 0 ? [.81, .61, 1] : [.68, .84, 1], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

export function mountParticles(host: HTMLDivElement, source: PortraitSource, onFailure: () => void): ParticleController {
  gsap.registerPlugin(ScrollTrigger);
  const anchor = document.querySelector<HTMLElement>(".identity-field");
  const main = document.querySelector<HTMLElement>("main");
  const assistant = document.querySelector<HTMLElement>(".assistant-section");
  const agentAnchor = document.querySelector<HTMLElement>(".agent-symbol");
  const infraAnchor = document.querySelector<HTMLElement>(".infrastructure-anchor");
  const chapter = document.querySelector<HTMLElement>(".agentic-chapter");
  const networkAnchor = document.querySelector<HTMLElement>(".agentic-network");
  const projectChapter = document.querySelector<HTMLElement>(".projects-section");
  const projectAnchor = document.querySelector<HTMLElement>(".project-particle-anchor");
  const contactChapter = document.querySelector<HTMLElement>(".contact-section");
  if (!anchor || !main || !assistant || !agentAnchor || !infraAnchor || !chapter || !networkAnchor || !projectChapter || !projectAnchor || !contactChapter) throw new Error("Particle scene requires its HTML anchors");
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
  const compact = innerWidth < 850 || matchMedia("(pointer: coarse)").matches;
  const dpr = compact ? Math.min(Math.max(devicePixelRatio, 1.5), 2) : 2;
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0, 0);
  host.appendChild(renderer.domElement);
  const data = createPortraitParticles(compact ? 12000 : 24000, source);
  const count = data.sizes.length;
  // Pack profile scalars together to stay within mobile GPU attribute limits.
  const profile = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) profile.set([data.weights[i], data.intensities[i], data.fades[i]], i * 3);
  renderer.domElement.dataset.particleCount = String(count);
  const geometry = new THREE.BufferGeometry();
  const attributes: [string, Float32Array, number][] = [
    ["position", data.positions, 3], ["aScatter", data.scatter, 3],
    ["aColor", data.colors, 3], ["aNormal", data.normals, 3],
    ["aSize", data.sizes, 1], ["aSeed", data.seeds, 1],
    ["aProfile", profile, 3],
  ];
  const networkData = createNetworkDestinations(count);
  attributes.push(["aNetwork", networkData.positions, 3], ["aNode", networkData.nodes, 1], ["aFlow", networkData.flows, 1],
    ["aAgent", createAgentDestinations(count), 3], ["aInfrastructure", createInfrastructureDestinations(count), 3],
    ["aCloudOps", createProjectDestinations((projectChapter.dataset.project || "opspilot") as ProjectKey, count), 3]);
  for (const [name, values, size] of attributes) geometry.setAttribute(name, new THREE.BufferAttribute(values, size));
  const projectAttribute = geometry.getAttribute("aCloudOps") as THREE.BufferAttribute;
  projectAttribute.setUsage(THREE.DynamicDrawUsage);
  const uniforms = {
    uOpacity: { value: compact ? .95 : .7 },
    uTime: { value: 0 }, uProgress: { value: 0 }, uScale: { value: 180 }, uDpr: { value: dpr },
    uViewport: { value: new THREE.Vector2(innerWidth, innerHeight) },
    uCenter: { value: new THREE.Vector2() }, uCursor: { value: new THREE.Vector2() },
    uPointer: { value: new THREE.Vector2(10000, 10000) }, uRepulsion: { value: 0 },
    uAgent: { value: 0 }, uAgentCenter: { value: new THREE.Vector2() }, uAgentExtent: { value: new THREE.Vector2() },
    uInfrastructure: { value: 0 }, uInfrastructureCenter: { value: new THREE.Vector2() }, uInfrastructureExtent: { value: new THREE.Vector2() },
    uGather: { value: 0 }, uPhase: { value: 0 }, uFlow: { value: 0 },
    uNetworkCenter: { value: new THREE.Vector2() }, uNetworkExtent: { value: new THREE.Vector2() },
    uProject: { value: 0 }, uProjectCenter: { value: new THREE.Vector2() }, uProjectExtent: { value: new THREE.Vector2() },
    uContact: { value: 0 },
    uPivot: { value: new THREE.Vector3(...source.particleMeta.pivot as [number, number, number]) },
  };
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false, depthTest: false, blending: THREE.NormalBlending });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  const scene = new THREE.Scene();
  const ambientGeometry = createAmbientGeometry(compact);
  const ambientMaterial = new THREE.ShaderMaterial({ uniforms: { ...uniforms, uOpacity: { value: 1.25 } }, vertexShader: ambientVertexShader, fragmentShader, transparent: true, depthWrite: false, depthTest: false, blending: THREE.NormalBlending });
  const ambient = new THREE.Points(ambientGeometry, ambientMaterial);
  ambient.frustumCulled = false; ambient.renderOrder = -1;
  const atmosphere = createSceneAtmosphere(uniforms, ambientGeometry, compact);
  const lightFocus = new THREE.Vector2();
  scene.add(atmosphere.field, atmosphere.trails, ambient, points);
  const camera = new THREE.Camera();
  const cursor = new THREE.Vector2(), pointer = new THREE.Vector2(10000, 10000);
  const progress = { value: 0 }, agentProgress = { value: 0 }, infraProgress = { value: 0 };
  const gatherProgress = { value: 0 }, sequence = { value: 0 }, projectProgress = { value: 0 }, contactProgress = { value: 0 };
  const stories = [...chapter.querySelectorAll<HTMLElement>("[data-phase-story]")];
  const phaseLinks = [...chapter.querySelectorAll<HTMLAnchorElement>("[data-phase-link]")];
  const diagram = chapter.querySelector<SVGElement>(".network-diagram");
  let width = innerWidth, height = innerHeight, anchorTop = 0, anchorLeft = 0, anchorWidth = 0, anchorHeight = 0;
  let pointerActive = false, paused = false, visible = true, disposed = false, failed = false, frame = 0, resizeFrame = 0, previous = 0, elapsed = 0;
  let samples = 0, totalFrameTime = 0, qualityLevel = 0, qualityWindowStart = 2;
  let lastPhase = -1, selectedPhase: number | null = null, lastRouteOffset = "";
  let pendingProject: ProjectKey | null = null, projectFrom: Float32Array | null = null, projectTo: Float32Array | null = null, projectChangeStart = 0;
  const measure = () => {
    width = innerWidth; height = innerHeight;
    const rect = anchor.getBoundingClientRect();
    anchorTop = rect.top + scrollY; anchorLeft = rect.left; anchorWidth = rect.width; anchorHeight = rect.height;
    uniforms.uViewport.value.set(width, height);
    uniforms.uScale.value = Math.min(anchorWidth * .37, anchorHeight * .3);
    renderer.setSize(width, height);
  };
  measure();
  const start = () => Math.max(0, anchorTop + anchorHeight * .5 - height * .5);
  const tweens: gsap.core.Tween[] = [];
  tweens.push(gsap.to(progress, { value: 1, ease: "none", scrollTrigger: {
    trigger: main, start,
    end: () => Math.max(start() + height * .45, assistant.getBoundingClientRect().top + scrollY - height * .65),
    scrub: .55, invalidateOnRefresh: true,
  } }));
  tweens.push(gsap.to(agentProgress, { value: 1, ease: "none", scrollTrigger: {
    trigger: assistant, start: "top 60%",
    end: () => Math.max(assistant.getBoundingClientRect().top + scrollY, agentAnchor.getBoundingClientRect().top + scrollY - height * .35),
    scrub: .7, invalidateOnRefresh: true,
  } }));
  const morph = (value: { value: number }, trigger: HTMLElement) => {
    tweens.push(gsap.to(value, { value: 1, ease: "none", scrollTrigger: { trigger, start: "top 70%", end: "top 25%", scrub: .7, invalidateOnRefresh: true } }));
  };
  morph(infraProgress, infraAnchor); morph(gatherProgress, networkAnchor); morph(projectProgress, projectAnchor);
  tweens.push(gsap.to(sequence, { value: 2.999, ease: "none", scrollTrigger: {
    trigger: chapter, start: "top 30%", end: "bottom 65%", scrub: .5, invalidateOnRefresh: true,
  } }));
  tweens.push(gsap.to(contactProgress, { value: 1, ease: "none", scrollTrigger: {
    trigger: contactChapter, start: "top 90%",
    end: () => Math.min(contactChapter.getBoundingClientRect().top + scrollY - height * .35, document.documentElement.scrollHeight - height),
    scrub: .8, invalidateOnRefresh: true,
  } }));
  const applyPhase = (phase: number) => {
    chapter.dataset.phase = String(phase);
    stories.forEach((story, index) => { story.dataset.active = String(index === phase); });
    phaseLinks.forEach((link, index) => { if (index === phase) link.setAttribute("aria-current", "step"); else link.removeAttribute("aria-current"); });
  };
  const context = gsap.context(() => {
    gsap.from(".hero-copy > *", { y: 18, opacity: 0, stagger: .09, duration: .9, ease: "power3.out", clearProps: "all" });
    main.querySelectorAll<HTMLElement>(".section-copy, .assistant-identity > .section-title, .projects-heading, .contact-grid > *, .chapter-heading").forEach(element => {
      gsap.fromTo(element, { y: 20, opacity: .65 }, { y: 0, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 95%", end: "top 55%", scrub: .5 } });
    });
  }, main);
  const resetChapter = () => {
    delete chapter.dataset.phase;
    stories.forEach(story => delete story.dataset.active);
    phaseLinks.forEach(link => link.removeAttribute("aria-current"));
    diagram?.style.removeProperty("--route-offset");
    for (const key of ["gather", "flow", "agent", "infrastructure", "project", "contact", "projectMix", "atmosphereTime", "atmosphereBloom", "atmosphereMode"]) delete host.dataset[key];
  };
  const stopMotion = () => { tweens.forEach(tween => { tween.scrollTrigger?.kill(); tween.kill(); }); context.revert(); resetChapter(); };
  const fail = () => {
    if (failed || disposed) return;
    failed = true; cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame);
    host.dataset.renderState = "failed"; host.style.visibility = "hidden";
    stopMotion(); onFailure();
  };
  renderer.debug.onShaderError = fail;

  const render = (now: number) => {
    frame = 0;
    if (disposed || failed || paused || !visible || document.hidden) return;
    const delta = previous ? Math.min(now - previous, 80) : 16.7;
    previous = now; elapsed += delta / 1000;
    if (pendingProject) {
      projectFrom = new Float32Array(projectAttribute.array as Float32Array);
      projectTo = createProjectDestinations(pendingProject, count);
      host.dataset.projectKey = pendingProject; pendingProject = null; projectChangeStart = elapsed;
    }
    if (projectFrom && projectTo) {
      const t = Math.min(1, (elapsed - projectChangeStart) / .9), eased = t * t * (3 - 2 * t);
      const values = projectAttribute.array as Float32Array;
      for (let i = 0; i < values.length; i++) values[i] = projectFrom[i] + (projectTo[i] - projectFrom[i]) * eased;
      projectAttribute.needsUpdate = true; host.dataset.projectMix = t.toFixed(3);
      if (t === 1) { projectFrom = null; projectTo = null; }
    }
    uniforms.uTime.value = elapsed;
    uniforms.uProgress.value = progress.value; uniforms.uAgent.value = agentProgress.value;
    uniforms.uInfrastructure.value = infraProgress.value; uniforms.uGather.value = gatherProgress.value;
    uniforms.uFlow.value = sequence.value; uniforms.uProject.value = projectProgress.value; uniforms.uContact.value = contactProgress.value;
    if (gatherProgress.value < .1 || projectProgress.value > .1) selectedPhase = null;
    const phase = selectedPhase ?? Math.min(2, Math.floor(sequence.value)); uniforms.uPhase.value = phase;
    uniforms.uCursor.value.lerp(cursor, 1 - Math.exp(-delta / 120));
    uniforms.uPointer.value.lerp(pointer, 1 - Math.exp(-delta / 70));
    uniforms.uRepulsion.value = THREE.MathUtils.lerp(uniforms.uRepulsion.value, pointerActive ? 1 : 0, 1 - Math.exp(-delta / 100));
    uniforms.uCenter.value.set(anchorLeft + anchorWidth * .5 - width * .5, height * .5 - (anchorTop - scrollY + anchorHeight * .5));
    const track = (element: HTMLElement, center: THREE.Vector2, extent: THREE.Vector2) => {
      const rect = element.getBoundingClientRect();
      extent.set(rect.width, rect.height);
      center.set(rect.left + rect.width * .5 - width * .5, height * .5 - rect.top - rect.height * .5);
    };
    track(agentAnchor, uniforms.uAgentCenter.value, uniforms.uAgentExtent.value);
    track(infraAnchor, uniforms.uInfrastructureCenter.value, uniforms.uInfrastructureExtent.value);
    track(networkAnchor, uniforms.uNetworkCenter.value, uniforms.uNetworkExtent.value);
    track(projectAnchor, uniforms.uProjectCenter.value, uniforms.uProjectExtent.value);
    lightFocus.copy(uniforms.uCenter.value)
      .lerp(uniforms.uAgentCenter.value, agentProgress.value)
      .lerp(uniforms.uInfrastructureCenter.value, infraProgress.value)
      .lerp(uniforms.uNetworkCenter.value, gatherProgress.value)
      .lerp(uniforms.uProjectCenter.value, projectProgress.value);
    const pulse = (value: number) => Math.pow(Math.sin(Math.PI * value), 4);
    const bloom = Math.max(pulse(agentProgress.value), pulse(infraProgress.value), pulse(gatherProgress.value), pulse(projectProgress.value), projectFrom ? pulse(Math.min(1, (elapsed - projectChangeStart) / .9)) : 0);
    atmosphere.update(lightFocus, bloom, qualityLevel, contactProgress.value);
    host.dataset.atmosphereMode = qualityLevel === 2 ? "static" : "animated";
    host.dataset.atmosphereTime = elapsed.toFixed(3); host.dataset.atmosphereBloom = bloom.toFixed(3);
    const diagnostics = { progress: progress.value.toFixed(3), rotation: uniforms.uCursor.value.x.toFixed(3), agent: agentProgress.value.toFixed(3), infrastructure: infraProgress.value.toFixed(3), gather: gatherProgress.value.toFixed(3), flow: sequence.value.toFixed(3), project: projectProgress.value.toFixed(3), contact: contactProgress.value.toFixed(3) };
    for (const [key, value] of Object.entries(diagnostics)) if (host.dataset[key] !== value) host.dataset[key] = value;
    if (phase !== lastPhase) { applyPhase(phase); lastPhase = phase; }
    const routeOffset = String(-Math.round((sequence.value - phase) * 1000) / 10);
    if (routeOffset !== lastRouteOffset) { diagram?.style.setProperty("--route-offset", routeOffset); lastRouteOffset = routeOffset; }
    renderer.render(scene, camera);
    if (failed) return;
    if (elapsed > qualityWindowStart && samples < 100) {
      totalFrameTime += delta; samples++;
      if (samples === 100) {
        const mean = totalFrameTime / samples; host.dataset.meanFrameMs = mean.toFixed(1);
        if (qualityLevel < 2 && mean > (qualityLevel === 0 ? 30 : 26)) {
          qualityLevel = qualityLevel === 0 && mean > 45 ? 2 : qualityLevel + 1;
          const nextDpr = qualityLevel === 1 ? 1.5 : 1.25;
          renderer.setPixelRatio(nextDpr); uniforms.uDpr.value = nextDpr;
          const reducedCount = Math.floor(count * (qualityLevel === 1 ? .65 : .45));
          geometry.setIndex(Array.from({ length: reducedCount }, (_, i) => Math.floor(i * count / reducedCount)));
          geometry.setDrawRange(0, reducedCount);
          host.dataset.quality = qualityLevel === 1 ? "reduced" : "economy";
          samples = 0; totalFrameTime = 0; qualityWindowStart = elapsed + 1;
        }
      }
    }
    frame = requestAnimationFrame(render);
  };
  const wake = () => {
    if (!disposed && !failed && !paused && visible && !document.hidden && !frame) { previous = 0; frame = requestAnimationFrame(render); }
  };
  const pointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || paused) return;
    cursor.set(Math.max(-1, Math.min(1, (event.clientX - width * .5) / (width * .5))), Math.max(-1, Math.min(1, (event.clientY - height * .5) / (height * .5))));
    pointer.set(event.clientX - width * .5, height * .5 - event.clientY);
    if (!pointerActive) uniforms.uPointer.value.copy(pointer);
    pointerActive = true;
  };
  const pointerLeave = () => { cursor.set(0, 0); pointerActive = false; };
  const selectPhase = (event: MouseEvent) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>("[data-phase-link]");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); const phase = Number(link.dataset.phaseLink);
    if (phase < 0 || phase > 2) return;
    selectedPhase = phase; applyPhase(phase); lastPhase = phase;
    stories[phase].focus({ preventScroll: true });
    if (innerWidth > 850) networkAnchor.scrollIntoView({ block: "center", behavior: paused ? "instant" : "smooth" });
  };
  const selectProject = (event: Event) => {
    const key: unknown = (event as CustomEvent).detail;
    if (key !== "opspilot" && key !== "insightloop" && key !== "cloudops") return;
    pendingProject = key; wake();
  };
  const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else wake(); };
  const resize = () => {
    if (resizeFrame || disposed) return;
    resizeFrame = requestAnimationFrame(() => { resizeFrame = 0; measure(); ScrollTrigger.refresh(); wake(); });
  };
  const observer = new ResizeObserver(resize);
  [anchor, agentAnchor, infraAnchor, networkAnchor, projectAnchor, main].forEach(element => observer.observe(element));
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) { cancelAnimationFrame(frame); frame = 0; } else wake();
  });
  intersection.observe(main);
  const lost = (event: Event) => { event.preventDefault(); fail(); };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  window.addEventListener("pointermove", pointerMove, { passive: true });
  document.addEventListener("pointerleave", pointerLeave);
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("resize", resize);
  window.addEventListener("portfolio-project", selectProject);
  chapter.addEventListener("click", selectPhase);
  host.dataset.quality = compact ? "compact" : "full"; host.dataset.renderState = "running";
  host.dataset.atmosphereMode = "animated";
  host.dataset.projectKey = projectChapter.dataset.project || "opspilot"; host.style.visibility = "";
  ScrollTrigger.refresh(); wake();

  return {
    setPaused(value) {
      paused = value; host.dataset.renderState = paused ? "paused" : "running";
      if (paused) { cancelAnimationFrame(frame); frame = 0; context.getTweens().forEach((t: gsap.core.Tween) => t.pause()); }
      else { context.getTweens().forEach((t: gsap.core.Tween) => t.resume()); wake(); }
    },
    dispose() {
      if (disposed) return; disposed = true;
      cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame);
      observer.disconnect(); intersection.disconnect();
      window.removeEventListener("resize", resize); window.removeEventListener("portfolio-project", selectProject);
      chapter.removeEventListener("click", selectPhase); window.removeEventListener("pointermove", pointerMove);
      document.removeEventListener("pointerleave", pointerLeave); document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      stopMotion();
      atmosphere.dispose(); geometry.dispose(); material.dispose(); ambientGeometry.dispose(); ambientMaterial.dispose(); renderer.dispose(); renderer.forceContextLoss();
      renderer.domElement.remove(); host.style.visibility = "";
    },
  };
}
