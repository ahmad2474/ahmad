/*
 * Agentic Hologram — portrait particles
 * Framework-agnostic core. Pass THREE in (bundler import or script-tag global)
 * plus the particle data (base64 string + meta) generated from the portrait.
 *
 * Returned API:
 *   setScatter(0..1)          explode particles outward (scroll hook)
 *   setPointer(nx, ny)        pointer in -1..1; drives head turn when followCursor is on
 *   setPointerStrength(0..1)  particles avoid the pointer (off by default)
 *   setFollowCursor(bool)
 *   dispose()
 */
function createHologram(THREE, container, options) {
  var opts = Object.assign({
    data: '', meta: null,
    count: 44000, mobileCount: 22000,
    colorA: '#ff3ddc', colorB: '#7b3cff', colorC: '#ffe3fb',
    size: 22,
    maxYaw: 0.35,    // ~20 degrees left/right
    maxPitch: 0.17,  // ~10 degrees up/down
    followCursor: true,
    listenToWindow: true,
  }, options || {});

  var width = function () { return container.clientWidth || window.innerWidth; };
  var height = function () { return container.clientHeight || window.innerHeight; };

  /* ---- decode particle data ---- */
  var bin = atob(opts.data);
  var bytes = new Uint8Array(bin.length);
  for (var b = 0; b < bin.length; b++) bytes[b] = bin.charCodeAt(b);
  var view = new DataView(bytes.buffer);
  var stride = opts.meta.stride;
  var available = opts.meta.count;
  var wanted = width() < 700 ? opts.mobileCount : opts.count;
  var nPerson = Math.min(available, wanted);
  var nDust = Math.round(nPerson * 0.03);
  var total = nPerson + nDust;

  var pos = new Float32Array(total * 3);
  var nrm = new Float32Array(total * 3);
  var inten = new Float32Array(total);
  var weight = new Float32Array(total);
  var fade = new Float32Array(total);
  var seed = new Float32Array(total);
  var type = new Float32Array(total);

  for (var i = 0; i < nPerson; i++) {
    var o = i * stride;
    pos[i * 3] = view.getInt16(o, true) / 4000;
    pos[i * 3 + 1] = view.getInt16(o + 2, true) / 4000;
    pos[i * 3 + 2] = view.getInt16(o + 4, true) / 4000;
    nrm[i * 3] = view.getInt8(o + 6) / 127;
    nrm[i * 3 + 1] = view.getInt8(o + 7) / 127;
    nrm[i * 3 + 2] = view.getInt8(o + 8) / 127;
    inten[i] = bytes[o + 9] / 255;
    weight[i] = bytes[o + 10] / 255;
    fade[i] = bytes[o + 11] / 255;
    seed[i] = Math.random();
    type[i] = 0;
  }
  for (var d = nPerson; d < total; d++) {
    var a = Math.random() * Math.PI * 2, r = 1.3 + Math.random() * 1.6;
    pos[d * 3] = Math.cos(a) * r;
    pos[d * 3 + 1] = -2.4 + Math.random() * 4.8;
    pos[d * 3 + 2] = Math.sin(a) * r * 0.5;
    var u = Math.random() * 2 - 1, t2 = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
    nrm[d * 3] = s * Math.cos(t2); nrm[d * 3 + 1] = u; nrm[d * 3 + 2] = s * Math.sin(t2);
    inten[d] = 0.5; weight[d] = 0; fade[d] = 1; seed[d] = Math.random(); type[d] = 1;
  }

  /* ---- renderer ---- */
  var renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
  var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width(), height());
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.display = 'block';
  container.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, width() / height(), 0.1, 100);

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geometry.setAttribute('aDir', new THREE.BufferAttribute(nrm, 3));
  geometry.setAttribute('aIntensity', new THREE.BufferAttribute(inten, 1));
  geometry.setAttribute('aWeight', new THREE.BufferAttribute(weight, 1));
  geometry.setAttribute('aFade', new THREE.BufferAttribute(fade, 1));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  geometry.setAttribute('aType', new THREE.BufferAttribute(type, 1));

  var p = opts.meta.pivot;
  var uniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uSize: { value: opts.size },
    uScatter: { value: 0 },
    uRotX: { value: 0 },
    uRotY: { value: 0 },
    uPivot: { value: new THREE.Vector3(p[0], p[1], p[2]) },
    uPointer: { value: new THREE.Vector3(99, 99, 0) },
    uPointerStrength: { value: 0 },
    uColorA: { value: new THREE.Color(opts.colorA) },
    uColorB: { value: new THREE.Color(opts.colorB) },
    uColorC: { value: new THREE.Color(opts.colorC) },
  };

  var vertexShader = [
    'uniform float uTime, uPixelRatio, uSize, uScatter, uRotX, uRotY, uPointerStrength;',
    'uniform vec3 uPivot, uPointer, uColorA, uColorB, uColorC;',
    'attribute vec3 aDir;',
    'attribute float aIntensity, aWeight, aFade, aSeed, aType;',
    'varying vec3 vColor;',
    'varying float vAlpha;',
    'float hash(float n) { return fract(sin(n) * 43758.5453123); }',
    'vec3 turn(vec3 q, float yaw, float pitch) {',
    '  float cy = cos(yaw), sy = sin(yaw);',
    '  q = vec3(cy * q.x + sy * q.z, q.y, -sy * q.x + cy * q.z);',
    '  float cx = cos(pitch), sx = sin(pitch);',
    '  return vec3(q.x, cx * q.y - sx * q.z, sx * q.y + cx * q.z);',
    '}',
    'void main() {',
    '  float t = uTime;',
    '  bool isDust = aType > 0.5;',
    '  vec3 p = position;',
    '  p += aDir * sin(t * 1.3 + aSeed * 6.2831) * 0.004;',
    '  if (isDust) {',
    '    p.y = mod(p.y + t * (0.06 + aSeed * 0.1) + 2.4, 4.8) - 2.4;',
    '    p.x += sin(t * 0.4 + aSeed * 20.0) * 0.06;',
    '  }',
    // head turn around the neck pivot; torso follows only slightly
    '  float yaw = uRotY * aWeight;',
    '  float pitch = uRotX * aWeight;',
    '  p = turn(p - uPivot, yaw, pitch) + uPivot;',
    '  vec3 n = turn(aDir, yaw, pitch);',
    // glitch slices
    '  float burst = step(0.94, hash(floor(t * 4.0)));',
    '  float sr = hash(floor(position.y * 14.0) * 12.9898 + floor(t * 14.0) * 78.233);',
    '  p.x += burst * step(0.75, sr) * (sr - 0.87) * 0.25;',
    // scatter hook
    '  float sc = uScatter * uScatter;',
    '  vec3 rnd = vec3(hash(aSeed * 91.7), hash(aSeed * 47.3), hash(aSeed * 13.1)) - 0.5;',
    '  p += (normalize(aDir + rnd) * (1.0 + aSeed * 3.0) + rnd * 3.0) * sc;',
    '  vec4 world = modelMatrix * vec4(p, 1.0);',
    // pointer avoid hook
    '  vec2 away = world.xy - uPointer.xy;',
    '  float force = uPointerStrength * (1.0 - smoothstep(0.0, 0.7, length(away)));',
    '  world.xy += normalize(away + 1e-5) * force * 0.35;',
    '  vec4 mv = viewMatrix * world;',
    '  gl_Position = projectionMatrix * mv;',
    '  float size = uSize * (0.55 + aSeed * 0.6) * (0.75 + aIntensity * 0.55);',
    '  if (isDust) size *= 0.8;',
    '  gl_PointSize = size * uPixelRatio / -mv.z;',
    '  vec3 v = normalize(cameraPosition - world.xyz);',
    '  float rim = pow(1.0 - clamp(abs(dot(normalize(n), v)), 0.0, 1.0), 3.0);',
    '  float scan = 0.8 + 0.2 * sin(position.y * 90.0 - t * 4.0);',
    '  float sweepY = mod(t * 0.45, 4.2) - 1.9;',
    '  float sweep = 1.0 - smoothstep(0.0, 0.12, abs(position.y - sweepY));',
    '  float flicker = 0.9 + 0.1 * sin(t * 23.0 + aSeed * 60.0);',
    '  float h = clamp((position.y + 1.5) / 3.0, 0.0, 1.0);',
    '  vec3 col = mix(uColorB, uColorA, clamp(h * 0.7 + aIntensity * 0.5 + (aSeed - 0.5) * 0.3, 0.0, 1.0));',
    '  col = mix(col, uColorC, smoothstep(0.7, 1.0, aIntensity) * 0.45 + sweep * 0.7);',
    '  float alpha;',
    '  if (isDust) {',
    '    alpha = 0.18 * (1.0 - smoothstep(1.4, 2.4, abs(p.y)));',
    '  } else {',
    '    alpha = (0.08 + aIntensity * aIntensity * 0.85 + rim * 0.25) * scan * aFade;',
    '    alpha += sweep * 0.35 * aFade;',
    '  }',
    '  alpha *= 1.0 - sc * 0.5;',
    '  vColor = col;',
    '  vAlpha = alpha * flicker;',
    '}'
  ].join('\n');

  var fragmentShader = [
    'varying vec3 vColor;',
    'varying float vAlpha;',
    'void main() {',
    '  float d = length(gl_PointCoord - 0.5);',
    '  float glow = pow(1.0 - smoothstep(0.0, 0.5, d), 2.0);',
    '  if (glow < 0.01) discard;',
    '  gl_FragColor = vec4(vColor * 1.3, glow * vAlpha);',
    '}'
  ].join('\n');

  var material = new THREE.ShaderMaterial({
    uniforms: uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  var points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  function fitCamera() {
    var aspect = width() / height();
    camera.aspect = aspect;
    var visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360);
    var distH = 3.35 / visibleH;
    var distW = 2.5 / (visibleH * aspect);
    camera.position.set(0, 0.05, Math.max(distH, distW) + 0.5);
    camera.lookAt(0, 0.05, 0);
    camera.updateProjectionMatrix();
  }
  fitCamera();

  /* ---- state + hooks ---- */
  var target = { scatter: 0, strength: 0, yaw: 0, pitch: 0, px: 99, py: 99 };
  var current = { scatter: 0, strength: 0, yaw: 0, pitch: 0, px: 99, py: 99 };
  var follow = opts.followCursor;
  var pointerActive = false;
  var tmp = new THREE.Vector3();

  function setPointer(nx, ny) {
    pointerActive = true;
    if (follow) {
      target.yaw = Math.max(-1, Math.min(1, nx)) * opts.maxYaw;
      target.pitch = -Math.max(-1, Math.min(1, ny)) * opts.maxPitch;
    }
    tmp.set(nx, ny, 0.5).unproject(camera).sub(camera.position).normalize();
    var dist = -camera.position.z / tmp.z;
    target.px = camera.position.x + tmp.x * dist;
    target.py = camera.position.y + tmp.y * dist;
  }

  function onPointerMove(e) {
    var rect = container.getBoundingClientRect();
    var cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    // measured from the hologram centre, normalised by half the viewport
    setPointer((e.clientX - cx) / (window.innerWidth / 2), -(e.clientY - cy) / (window.innerHeight / 2));
  }
  function onLeave(e) { if (!e.relatedTarget) pointerActive = false; }
  if (opts.listenToWindow) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseout', onLeave);
  }

  var onResize = function () { renderer.setSize(width(), height()); fitCamera(); };
  var ro = null;
  if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(onResize); ro.observe(container); }
  else window.addEventListener('resize', onResize);

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var start = performance.now();
  var raf = 0;
  function lerp(a, b, k) { return a + (b - a) * k; }

  function frame() {
    raf = requestAnimationFrame(frame);
    var now = performance.now();
    var t = (now - start) / 1000;
    uniforms.uTime.value = reduceMotion ? t * 0.25 : t;

    // no pointer yet, pointer left the window, or touch device: drift gently on its own
    var idle = !pointerActive;
    var ty = target.yaw, tp = target.pitch;
    if (idle && follow && !reduceMotion) {
      ty = Math.sin(t * 0.35) * opts.maxYaw * 0.45;
      tp = Math.sin(t * 0.23) * opts.maxPitch * 0.3;
    }
    current.yaw = lerp(current.yaw, ty, 0.06);
    current.pitch = lerp(current.pitch, tp, 0.06);
    current.scatter = lerp(current.scatter, target.scatter, 0.06);
    current.strength = lerp(current.strength, target.strength, 0.08);
    current.px = lerp(current.px, target.px, 0.15);
    current.py = lerp(current.py, target.py, 0.15);

    uniforms.uRotY.value = current.yaw;
    uniforms.uRotX.value = current.pitch;
    uniforms.uScatter.value = current.scatter;
    uniforms.uPointerStrength.value = current.strength;
    uniforms.uPointer.value.set(current.px, current.py, 0);
    renderer.render(scene, camera);
  }
  frame();

  return {
    setScatter: function (v) { target.scatter = Math.max(0, Math.min(1, v)); },
    setPointer: setPointer,
    setPointerStrength: function (v) { target.strength = Math.max(0, Math.min(1, v)); },
    setFollowCursor: function (on) { follow = !!on; if (!follow) { target.yaw = 0; target.pitch = 0; } },
    particleCount: nPerson,
    dispose: function () {
      cancelAnimationFrame(raf);
      if (opts.listenToWindow) {
        window.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('mouseout', onLeave);
      }
      if (ro) ro.disconnect(); else window.removeEventListener('resize', onResize);
      geometry.dispose(); material.dispose(); renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    },
  };
}

export { createHologram };
