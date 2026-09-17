import * as THREE from "three";

interface SharedUniforms {
  uTime: { value: number };
  uViewport: { value: THREE.Vector2 };
  uCursor: { value: THREE.Vector2 };
}

const fieldVertex = `
  uniform float uTime, uBloom, uStrength;
  uniform vec2 uViewport, uCursor, uFocus;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float scale = min(uViewport.x, uViewport.y);
    vec2 p = position.xy * .5 * uViewport / scale;
    vec2 focus = uFocus / scale + uCursor * vec2(.018, -.012);
    vec2 local = p - focus;
    float drift = sin(uTime * .075) * .055;
    float halo = exp(-dot(local * vec2(1.25, .95), local * vec2(1.25, .95)) * 4.);
    float curtain = exp(-pow((local.x + local.y * .24 + drift) * 4., 2.))
      * exp(-pow(local.y * 1.3, 2.));
    float edge = exp(-dot(p - vec2(.55 + drift, -.28), p - vec2(.55 + drift, -.28)) * 3.);
    float alpha = (halo * (.095 + uBloom * .14) + curtain * .055 + edge * .025) * uStrength;
    vec3 violet = mix(vec3(.36, .17, .62), vec3(.6, .38, .86), curtain * .4 + uBloom * .2);
    vColor = violet; vAlpha = alpha;
    gl_Position = vec4(position.xy, .9, 1.);
  }
`;
const fieldFragment = `
  varying vec3 vColor;
  varying float vAlpha;
  void main() { gl_FragColor = vec4(vColor, vAlpha); }
`;
const trailVertex = `
  attribute float aSeed, aTail;
  uniform float uTime, uStrength, uTrailLength;
  uniform vec2 uViewport, uCursor;
  varying float vAlpha;
  void main() {
    vec2 phase = vec2(uTime * .09 + aSeed * 31., uTime * .07 + aSeed * 23.);
    vec2 xy = position.xy * uViewport + vec2(sin(phase.x), cos(phase.y)) * (12. + position.z * 18.);
    xy += uCursor * vec2(18., -12.) * position.z;
    vec2 direction = normalize(vec2(cos(phase.x) * .09, -sin(phase.y) * .07) + vec2(.0001));
    xy -= direction * aTail * uTrailLength;
    gl_Position = vec4(xy / (uViewport * .5), .6, 1.);
    float appearance = pow(max(0., sin(uTime * .26 + aSeed * 31.)), 12.);
    vAlpha = appearance * (1. - aTail) * .22 * uStrength;
  }
`;
const trailFragment = `
  varying float vAlpha;
  void main() { gl_FragColor = vec4(.68, .47, .95, vAlpha); }
`;

/** Shares the portrait's canvas, clock, pointer easing and lifecycle. No extra animation loop. */
export function createSceneAtmosphere(shared: SharedUniforms, ambient: THREE.BufferGeometry, compact: boolean) {
  const uniforms = { ...shared, uFocus: { value: new THREE.Vector2() }, uBloom: { value: 0 }, uStrength: { value: compact ? .6 : 1 }, uTrailLength: { value: compact ? 12 : 25 } };
  // Evaluate soft lighting at mesh vertices and interpolate it, avoiding expensive
  // full-screen exponential math for every retina pixel (especially on software GPUs).
  const fieldGeometry = new THREE.PlaneGeometry(2, 2, 32, 24);
  const fieldMaterial = new THREE.ShaderMaterial({ uniforms, vertexShader: fieldVertex, fragmentShader: fieldFragment, transparent: true, depthWrite: false, depthTest: false });
  const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
  field.frustumCulled = false; field.renderOrder = -3;

  // Each line follows an existing environmental particle, rather than adding another swarm.
  const count = compact ? 6 : 18;
  const source = ambient.getAttribute("position"), seeds = ambient.getAttribute("aSeed");
  const positions = new Float32Array(count * 6), seedValues = new Float32Array(count * 2), tails = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const index = Math.floor(i * source.count / count);
    for (let end = 0; end < 2; end++) {
      positions.set([source.getX(index), source.getY(index), source.getZ(index)], (i * 2 + end) * 3);
      seedValues[i * 2 + end] = seeds.getX(index); tails[i * 2 + end] = end;
    }
  }
  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  trailGeometry.setAttribute("aSeed", new THREE.BufferAttribute(seedValues, 1));
  trailGeometry.setAttribute("aTail", new THREE.BufferAttribute(tails, 1));
  const trailMaterial = new THREE.ShaderMaterial({ uniforms, vertexShader: trailVertex, fragmentShader: trailFragment, transparent: true, depthWrite: false, depthTest: false });
  const trails = new THREE.LineSegments(trailGeometry, trailMaterial);
  trails.frustumCulled = false; trails.renderOrder = -2;

  return {
    field, trails,
    update(focus: THREE.Vector2, bloom: number, quality: number, contact: number) {
      uniforms.uFocus.value.copy(focus);
      uniforms.uBloom.value = bloom * (1 - contact);
      uniforms.uStrength.value = (compact ? .6 : 1) * (quality === 2 ? .7 : 1) * (1 - contact * .35);
      // Drop decorative trails when the renderer reaches its smallest quality budget.
      trails.visible = quality < 2;
      field.visible = quality < 2;
    },
    dispose() { fieldGeometry.dispose(); fieldMaterial.dispose(); trailGeometry.dispose(); trailMaterial.dispose(); },
  };
}
