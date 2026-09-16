import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPortraitParticles, type PortraitSource } from "./portrait-particles";
import { createNetworkDestinations } from "./agentic-network";
import { createContextDestinations } from "./context-particles";
import { createCloudOpsDestinations } from "./cloudops-particles";

export interface ParticleController { dispose: () => void; setPaused: (paused: boolean) => void }

const vertexShader = `
  attribute vec3 aScatter;
  attribute vec3 aColor;
  attribute vec3 aNormal;
  attribute vec3 aNetwork;
  attribute vec3 aContext;
  attribute vec3 aCloudOps;
  attribute float aNode, aFlow;
  attribute float aSize;
  attribute float aSeed;
  attribute float aWeight, aIntensity, aFade;
  uniform float uTime, uProgress, uScale, uDpr, uRepulsion, uGather, uPhase, uFlow, uContext, uProject;
  uniform vec2 uViewport, uCenter, uCursor, uPointer;
  uniform vec2 uNetworkCenter, uNetworkExtent;
  uniform vec2 uContextCenter, uContextExtent;
  uniform vec2 uProjectCenter, uProjectExtent;
  uniform vec3 uPivot;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSeed;
  void main() {
    float spread = smoothstep(aSeed * .15, .82 + aSeed * .18, uProgress);
    // The supplied portrait is a depth surface, not a complete head scan.
    // Small turns plus lateral movement preserve presence without exposing missing sides.
    float ay = (uCursor.x * .095 + sin(uTime * .16) * .008) * aWeight;
    float ax = (-uCursor.y * .045) * aWeight;
    vec3 p = position - uPivot;
    p *= 1.0 + sin(uTime * .65 + aSeed * 2.) * .007;
    p.xz = mat2(cos(ay), -sin(ay), sin(ay), cos(ay)) * p.xz;
    p.yz = mat2(cos(ax), sin(ax), -sin(ax), cos(ax)) * p.yz;
    p += uPivot;
    vec2 home = uCenter + p.xy * uScale;
    home += uCursor * vec2(7., -4.) * aWeight;
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
    float context = smoothstep(aSeed * .12, .88 + aSeed * .12, uContext);
    vec2 contextXY = uContextCenter + aContext.xy * uContextExtent;
    contextXY += uCursor * vec2(24., -16.) * aContext.z;
    contextXY += vec2(sin(uTime * .2 + aContext.z * 8.), cos(uTime * .15 + aContext.z * 8.)) * 1.5;
    xy = mix(xy, contextXY, context);
    depth = mix(depth, aContext.z, context);
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
    gl_Position = vec4(xy / (uViewport * .5), -depth * .1, 1.);
    gl_PointSize = aSize * uDpr * (1. + depth * .23) * mix(1., .78, spread) * mix(1., .55, gather);
    vColor = aColor;
    float keyLight = .74 + .26 * max(dot(normalize(aNormal + vec3(.0001)), normalize(vec3(-.45, .7, 1.))), 0.);
    float portraitAlpha = (.19 + pow(aIntensity, 1.2) * .71) * aFade * keyLight;
    vAlpha = mix(portraitAlpha, .22 + aSeed * .14, spread);
    float activation = 1. - smoothstep(.2, .8, abs(aNode - (uPhase + 1.)));
    float signal = 1. - smoothstep(.02, .14, abs(aFlow - uFlow));
    float networkAlpha = .16 + smoothstep(-.14, .16, network.z) * .2 + activation * .32 + signal * .65;
    vAlpha = mix(vAlpha, networkAlpha, gather);
    vColor = mix(vColor, mix(vec3(.72, .85, 1.), vec3(.91, .72, 1.), uPhase * .5), gather * max(activation * .6, signal));
    vColor = mix(vColor, vec3(.85, .76, 1.), gather * .25);
    vAlpha = mix(vAlpha, .15 + aSeed * .14, context);
    vColor = mix(vColor, mix(vec3(.75, .69, 1.), vec3(.88, .8, 1.), aSeed), context);
    vAlpha = mix(vAlpha, .2 + aSeed * .17 + sin(uTime * .45 + projectPoint.y * 12.) * .04, projectGather);
    vColor = mix(vColor, mix(vec3(.72, .54, 1.), vec3(.9, .8, 1.), aSeed), projectGather);
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
    vAlpha = (.12 + position.z * .14) * (1. - smoothstep(.1, .8, uProgress));
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
  const chapter = document.querySelector<HTMLElement>(".agentic-chapter");
  const networkAnchor = document.querySelector<HTMLElement>(".agentic-network");
  const chapterStage = document.querySelector<HTMLElement>(".agentic-stage");
  const overview = document.querySelector<HTMLElement>(".agentic-overview");
  const contextChapter = document.querySelector<HTMLElement>(".context-chapter");
  const contextAnchor = document.querySelector<HTMLElement>(".context-particle-anchor");
  const contextDiagram = document.querySelector<SVGElement>(".context-diagram");
  const projectChapter = document.querySelector<HTMLElement>(".cloudops-chapter");
  const projectAnchor = document.querySelector<HTMLElement>(".cloudops-particle-anchor");
  const projectDiagram = document.querySelector<SVGElement>(".cloudops-diagram");
  if (!anchor || !main || !chapter || !networkAnchor || !chapterStage || !overview || !contextChapter || !contextAnchor || !projectChapter || !projectAnchor) throw new Error("Particle scene requires its HTML anchors");
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
  const compact = innerWidth < 850 || matchMedia("(pointer: coarse)").matches;
  const count = compact ? 12000 : 24000;
  // Supersample even 1x screens; tiny angular glyphs otherwise alias into static.
  const dpr = compact ? Math.min(Math.max(devicePixelRatio, 1.5), 2) : 2;
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0, 0);
  host.appendChild(renderer.domElement);
  const data = createPortraitParticles(count, source);
  renderer.domElement.dataset.particleCount = String(data.sizes.length);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
  geometry.setAttribute("aScatter", new THREE.BufferAttribute(data.scatter, 3));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(data.colors, 3));
  geometry.setAttribute("aNormal", new THREE.BufferAttribute(data.normals, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(data.sizes, 1));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(data.seeds, 1));
  geometry.setAttribute("aWeight", new THREE.BufferAttribute(data.weights, 1));
  geometry.setAttribute("aIntensity", new THREE.BufferAttribute(data.intensities, 1));
  geometry.setAttribute("aFade", new THREE.BufferAttribute(data.fades, 1));
  const networkData = createNetworkDestinations(data.sizes.length);
  geometry.setAttribute("aNetwork", new THREE.BufferAttribute(networkData.positions, 3));
  geometry.setAttribute("aNode", new THREE.BufferAttribute(networkData.nodes, 1));
  geometry.setAttribute("aFlow", new THREE.BufferAttribute(networkData.flows, 1));
  geometry.setAttribute("aContext", new THREE.BufferAttribute(createContextDestinations(data.sizes.length), 3));
  geometry.setAttribute("aCloudOps", new THREE.BufferAttribute(createCloudOpsDestinations(data.sizes.length), 3));
  const uniforms = {
    // Larger glyphs overlap more; compensate coverage to retain facial shading.
    uOpacity: { value: compact ? .95 : .7 },
    uTime: { value: 0 }, uProgress: { value: 0 }, uScale: { value: 180 }, uDpr: { value: dpr },
    uViewport: { value: new THREE.Vector2(innerWidth, innerHeight) },
    uCenter: { value: new THREE.Vector2() }, uCursor: { value: new THREE.Vector2() },
    uPointer: { value: new THREE.Vector2(10000, 10000) }, uRepulsion: { value: 0 },
    uGather: { value: 0 }, uPhase: { value: 0 }, uFlow: { value: 0 },
    uNetworkCenter: { value: new THREE.Vector2() }, uNetworkExtent: { value: new THREE.Vector2() },
    uContext: { value: 0 }, uContextCenter: { value: new THREE.Vector2() }, uContextExtent: { value: new THREE.Vector2() },
    uProject: { value: 0 }, uProjectCenter: { value: new THREE.Vector2() }, uProjectExtent: { value: new THREE.Vector2() },
    uPivot: { value: new THREE.Vector3(...source.particleMeta.pivot as [number, number, number]) },
  };
  const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false, depthTest: false, blending: THREE.NormalBlending });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  const scene = new THREE.Scene();
  const ambientGeometry = createAmbientGeometry(compact);
  const ambientMaterial = new THREE.ShaderMaterial({ uniforms: { ...uniforms, uOpacity: { value: 1.25 } }, vertexShader: ambientVertexShader, fragmentShader, transparent: true, depthWrite: false, depthTest: false, blending: THREE.NormalBlending });
  const ambient = new THREE.Points(ambientGeometry, ambientMaterial);
  ambient.frustumCulled = false;
  ambient.renderOrder = -1;
  scene.add(ambient);
  scene.add(points);
  const camera = new THREE.Camera();
  const cursor = new THREE.Vector2();
  const pointer = new THREE.Vector2(10000, 10000);
  let pointerActive = false;
  const progress = { value: 0 };
  const gatherProgress = { value: 0 }, sequence = { value: 0 };
  const contextProgress = { value: 0 };
  const projectProgress = { value: 0 };
  const stories = [...chapter.querySelectorAll<HTMLElement>("[data-phase-story]")];
  const phaseLinks = [...chapter.querySelectorAll<HTMLAnchorElement>("[data-phase-link]")];
  const diagram = chapter.querySelector<SVGElement>(".network-diagram");
  let lastPhase = -1, selectedPhase: number | null = null, hasSceneLead = false, lastRouteOffset = "", lastContextOffset = "", lastProjectOffset = "";
  let width = innerWidth, height = innerHeight, anchorTop = 0, anchorLeft = 0, anchorWidth = 0, anchorHeight = 0;
  let paused = false, visible = true, disposed = false, failed = false, frame = 0, previous = 0, elapsed = 0;
  let samples = 0, totalFrameTime = 0, qualityLevel = 0, qualityWindowStart = 2;

  const measure = () => {
    width = innerWidth; height = innerHeight;
    hasSceneLead = parseFloat(getComputedStyle(chapter).paddingTop) > 0;
    const rect = anchor.getBoundingClientRect();
    anchorTop = rect.top + scrollY; anchorLeft = rect.left; anchorWidth = rect.width; anchorHeight = rect.height;
    uniforms.uViewport.value.set(width, height);
    uniforms.uScale.value = Math.min(anchorWidth * .37, anchorHeight * .3);
    renderer.setSize(width, height);
  };
  measure();
  const start = () => Math.max(0, anchorTop + anchorHeight * .5 - height * .5);
  const tween = gsap.to(progress, { value: 1, ease: "none", scrollTrigger: {
    trigger: main, start, end: () => start() + height * 1.05, scrub: .55, invalidateOnRefresh: true,
  } });
  const chapterTop = () => chapter.getBoundingClientRect().top + scrollY;
  const sequenceStart = () => overview.getBoundingClientRect().top + scrollY - height * .2;
  const sequenceEnd = () => overview.getBoundingClientRect().bottom + scrollY - height * .35;
  const gatherTween = gsap.to(gatherProgress, { value: 1, ease: "none", scrollTrigger: {
    trigger: chapter, start: () => hasSceneLead ? chapterTop() + height * .05 : chapterTop() - height * .65,
    end: () => hasSceneLead ? sequenceStart() : chapterTop() + height * .1, scrub: .7, invalidateOnRefresh: true,
  } });
  const chapterTween = gsap.to(sequence, { value: 2.999, ease: "none", scrollTrigger: {
    trigger: overview, start: sequenceStart, end: sequenceEnd, scrub: .5, invalidateOnRefresh: true,
  } });
  const contextTween = gsap.to(contextProgress, { value: 1, ease: "none", scrollTrigger: {
    trigger: contextChapter, start: "top 90%", end: "top 20%", scrub: .8, invalidateOnRefresh: true,
  } });
  const projectTween = gsap.to(projectProgress, { value: 1, ease: "none", scrollTrigger: {
    trigger: projectChapter, start: "top 90%", end: "top 20%", scrub: .8, invalidateOnRefresh: true,
  } });
  const applyPhase = (phase: number) => {
    chapter.dataset.phase = String(phase);
    stories.forEach((story, index) => { story.hidden = false; story.dataset.active = String(index === phase); });
    phaseLinks.forEach((link, index) => { if (index === phase) link.setAttribute("aria-current", "step"); else link.removeAttribute("aria-current"); });
  };
  const context = gsap.context(() => {
    gsap.from(".hero-copy > *", { y: 18, opacity: 0, stagger: .09, duration: .9, ease: "power3.out", clearProps: "all" });
    gsap.fromTo(".chapter-heading > *", { y: 24, opacity: .55 }, { y: 0, opacity: 1, stagger: .04, ease: "power2.out", scrollTrigger: { trigger: overview, start: "top 85%", end: "top 20%", scrub: .6 } });
    stories.forEach(story => gsap.fromTo(story, { y: 24, opacity: .55, rotateX: -3 }, { y: 0, opacity: 1, rotateX: 0, ease: "power3.out", scrollTrigger: { trigger: story, start: "top 95%", end: "top 60%", scrub: .5 } }));
    gsap.fromTo(".context-heading > *", { y: 28, opacity: .55 }, { y: 0, opacity: 1, stagger: .04, ease: "power2.out", scrollTrigger: { trigger: contextChapter, start: "top 85%", end: "top 20%", scrub: .6 } });
    gsap.fromTo(".context-page-edge", { opacity: .3 }, { opacity: 1, stagger: .06, ease: "power2.out", scrollTrigger: { trigger: contextAnchor, start: "top 85%", end: "top 10%", scrub: .8 } });
    gsap.fromTo(".cloudops-heading > *", { y: 24, opacity: .55 }, { y: 0, opacity: 1, stagger: .04, ease: "power2.out", scrollTrigger: { trigger: projectChapter, start: "top 85%", end: "top 20%", scrub: .6 } });
    main.querySelectorAll<HTMLElement>(".context-step, .cloudops-capability, .cloudops-data, .cloudops-foundation article").forEach(element => gsap.fromTo(element, { y: 24, opacity: .55 }, { y: 0, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 95%", end: "top 65%", scrub: .5 } }));
  }, main);
  const resetChapter = () => {
    delete chapter.dataset.phase;
    stories.forEach(story => { story.hidden = false; delete story.dataset.active; });
    phaseLinks.forEach(link => link.removeAttribute("aria-current"));
    diagram?.style.removeProperty("--route-offset");
    contextDiagram?.style.removeProperty("--context-offset");
    projectDiagram?.style.removeProperty("--cloudops-offset");
    delete host.dataset.gather; delete host.dataset.flow; delete host.dataset.context; delete host.dataset.project;
  };
  const fail = () => {
    failed = true;
    cancelAnimationFrame(frame);
    host.dataset.renderState = "failed";
    host.style.visibility = "hidden";
    tween.scrollTrigger?.kill(); tween.kill(); gatherTween.scrollTrigger?.kill(); gatherTween.kill(); chapterTween.scrollTrigger?.kill(); chapterTween.kill(); contextTween.scrollTrigger?.kill(); contextTween.kill(); projectTween.scrollTrigger?.kill(); projectTween.kill(); context.revert(); resetChapter();
    onFailure();
  };
  renderer.debug.onShaderError = fail;

  const render = (now: number) => {
    frame = 0;
    if (disposed || failed || paused || !visible || document.hidden) return;
    const delta = previous ? Math.min(now - previous, 80) : 16.7;
    previous = now;
    elapsed += delta / 1000;
    uniforms.uTime.value = elapsed;
    uniforms.uProgress.value = progress.value;
    uniforms.uGather.value = gatherProgress.value;
    uniforms.uFlow.value = sequence.value;
    uniforms.uContext.value = contextProgress.value;
    uniforms.uProject.value = projectProgress.value;
    if (gatherProgress.value < .1 || contextProgress.value > .1) selectedPhase = null;
    const phase = selectedPhase ?? Math.min(2, Math.floor(sequence.value));
    uniforms.uPhase.value = phase;
    uniforms.uCursor.value.lerp(cursor, 1 - Math.exp(-delta / 120));
    uniforms.uPointer.value.lerp(pointer, 1 - Math.exp(-delta / 70));
    uniforms.uRepulsion.value = THREE.MathUtils.lerp(uniforms.uRepulsion.value, pointerActive ? 1 : 0, 1 - Math.exp(-delta / 100));
    // Follow the element initially, then let the same points occupy the viewport.
    uniforms.uCenter.value.set(anchorLeft + anchorWidth * .5 - width * .5, height * .5 - (anchorTop - scrollY + anchorHeight * .5));
    const diagnostics = { progress: progress.value.toFixed(3), rotation: uniforms.uCursor.value.x.toFixed(3), gather: gatherProgress.value.toFixed(3), flow: sequence.value.toFixed(3), context: contextProgress.value.toFixed(3), project: projectProgress.value.toFixed(3) };
    for (const [key, value] of Object.entries(diagnostics)) if (host.dataset[key] !== value) host.dataset[key] = value;
    const networkRect = networkAnchor.getBoundingClientRect();
    uniforms.uNetworkExtent.value.set(networkRect.width, networkRect.height);
    uniforms.uNetworkCenter.value.set(networkRect.left + networkRect.width * .5 - width * .5, height * .5 - networkRect.top - networkRect.height * .5);
    const contextRect = contextAnchor.getBoundingClientRect();
    uniforms.uContextExtent.value.set(contextRect.width, contextRect.height);
    uniforms.uContextCenter.value.set(contextRect.left + contextRect.width * .5 - width * .5, height * .5 - contextRect.top - contextRect.height * .5);
    const projectRect = projectAnchor.getBoundingClientRect();
    uniforms.uProjectExtent.value.set(projectRect.width, projectRect.height);
    uniforms.uProjectCenter.value.set(projectRect.left + projectRect.width * .5 - width * .5, height * .5 - projectRect.top - projectRect.height * .5);
    if (phase !== lastPhase) { applyPhase(phase); lastPhase = phase; }
    const routeOffset = String(-Math.round((sequence.value - phase) * 1000) / 10);
    if (routeOffset !== lastRouteOffset) { diagram?.style.setProperty("--route-offset", routeOffset); lastRouteOffset = routeOffset; }
    const contextOffset = String(-Math.round(contextProgress.value * 1000) / 10);
    if (contextOffset !== lastContextOffset) { contextDiagram?.style.setProperty("--context-offset", contextOffset); lastContextOffset = contextOffset; }
    const projectOffset = String(-Math.round((projectProgress.value * 90 + elapsed * 3) * 10) / 10);
    if (projectOffset !== lastProjectOffset) { projectDiagram?.style.setProperty("--cloudops-offset", projectOffset); lastProjectOffset = projectOffset; }
    renderer.render(scene, camera);
    if (failed) return;
    if (elapsed > qualityWindowStart && samples < 100) {
      totalFrameTime += delta; samples++;
      if (samples === 100) {
        const mean = totalFrameTime / samples;
        host.dataset.meanFrameMs = mean.toFixed(1);
        if (qualityLevel < 2 && mean > (qualityLevel === 0 ? 30 : 26)) {
          qualityLevel++;
          const nextDpr = qualityLevel === 1 ? 1.5 : 1.25;
          renderer.setPixelRatio(nextDpr); uniforms.uDpr.value = nextDpr;
          const reducedCount = Math.floor(data.sizes.length * (qualityLevel === 1 ? .65 : .45));
          geometry.setIndex(Array.from({ length: reducedCount }, (_, i) => Math.floor(i * data.sizes.length / reducedCount)));
          geometry.setDrawRange(0, reducedCount);
          host.dataset.quality = qualityLevel === 1 ? "reduced" : "economy";
          samples = 0; totalFrameTime = 0; qualityWindowStart = elapsed + 1;
        }
      }
    }
    frame = requestAnimationFrame(render);
  };
  const wake = () => {
    if (!disposed && !failed && !paused && visible && !document.hidden && !frame) {
      previous = 0; frame = requestAnimationFrame(render);
    }
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
    event.preventDefault();
    const phase = Number(link.dataset.phaseLink);
    selectedPhase = phase;
    applyPhase(phase); lastPhase = phase;
    stories[phase].focus({ preventScroll: true });
    stories[phase].scrollIntoView({ block: "nearest", behavior: paused ? "instant" : "smooth" });
  };
  const visibility = () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else wake();
  };
  const resize = () => { measure(); ScrollTrigger.refresh(); wake(); };
  const observer = new ResizeObserver(resize);
  observer.observe(anchor);
  observer.observe(networkAnchor);
  observer.observe(chapter);
  observer.observe(contextAnchor);
  observer.observe(contextChapter);
  observer.observe(projectAnchor);
  observer.observe(projectChapter);
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
  chapter.addEventListener("click", selectPhase);
  host.dataset.quality = compact ? "compact" : "full";
  host.dataset.renderState = "running";
  host.style.visibility = "";
  wake();

  return {
    setPaused(value) {
      paused = value;
      host.dataset.renderState = paused ? "paused" : "running";
      if (paused) { cancelAnimationFrame(frame); frame = 0; context.getTweens().forEach((t: gsap.core.Tween) => t.pause()); }
      else { context.getTweens().forEach((t: gsap.core.Tween) => t.resume()); wake(); }
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect(); intersection.disconnect();
      window.removeEventListener("resize", resize);
      chapter.removeEventListener("click", selectPhase);
      window.removeEventListener("pointermove", pointerMove);
      document.removeEventListener("pointerleave", pointerLeave);
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      tween.scrollTrigger?.kill(); tween.kill(); gatherTween.scrollTrigger?.kill(); gatherTween.kill(); chapterTween.scrollTrigger?.kill(); chapterTween.kill(); contextTween.scrollTrigger?.kill(); contextTween.kill(); projectTween.scrollTrigger?.kill(); projectTween.kill(); context.revert(); resetChapter();
      geometry.dispose(); material.dispose(); ambientGeometry.dispose(); ambientMaterial.dispose(); renderer.dispose(); renderer.forceContextLoss();
      renderer.domElement.remove();
      host.style.visibility = "";
    },
  };
}
