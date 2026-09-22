import { createPortraitParticles, type PortraitSource } from "./portrait-particles";

interface CanvasParticleController {
  dispose: () => void;
  setPaused: (paused: boolean) => void;
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (start: number, end: number, value: number) => {
  const amount = clamp((value - start) / Math.max(.0001, end - start));
  return amount * amount * (3 - 2 * amount);
};

/** CPU compatibility renderer used only when Chrome cannot create WebGL. */
export function mountCanvasParticles(
  host: HTMLDivElement,
  source: PortraitSource,
  onFailure: () => void,
  onReady: () => void,
): CanvasParticleController {
  const anchor = document.querySelector<HTMLElement>(".identity-field");
  const assistant = document.querySelector<HTMLElement>(".assistant-section");
  if (!anchor || !assistant) throw new Error("Canvas particle scene requires its HTML anchors");

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Canvas 2D context is unavailable");
  canvas.dataset.particleEngine = "canvas2d";
  host.appendChild(canvas);

  const compact = innerWidth < 850 || matchMedia("(pointer: coarse)").matches;
  const data = createPortraitParticles(compact ? 5000 : 8000, source, 1);
  const count = data.sizes.length;
  canvas.dataset.particleCount = String(count);
  const groups = new Uint8Array(count);
  for (let index = 0; index < count; index++) groups[index] = index % 5 === 0 ? 1 : index % 3 === 0 ? 2 : 0;

  const ambientCount = compact ? 70 : 140;
  const ambient = new Float32Array(ambientCount * 4);
  let randomState = 2474;
  const random = () => { randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0; return randomState / 4294967296; };
  for (let index = 0; index < ambientCount; index++) {
    ambient.set([random(), random(), random(), random()], index * 4);
  }

  let width = 1;
  let height = 1;
  let dpr = 1;
  let frame = 0;
  let lastDraw = 0;
  let startTime = 0;
  let paused = false;
  let disposed = false;
  let ready = false;
  let cursorX = 0;
  let cursorY = 0;
  let pointerX = -10000;
  let pointerY = -10000;
  let pointerActive = false;

  const resize = () => {
    width = innerWidth;
    height = innerHeight;
    dpr = compact ? Math.min(devicePixelRatio, 1.5) : Math.min(devicePixelRatio, 1.35);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  };
  resize();

  const schedule = () => {
    if (!disposed && !paused && !document.hidden && !frame) frame = requestAnimationFrame(draw);
  };
  const draw = (now: number) => {
    frame = 0;
    if (disposed || paused || document.hidden) return;
    if (lastDraw && now - lastDraw < 30) { schedule(); return; }
    if (!startTime) startTime = now;
    const time = (now - startTime) / 1000;
    lastDraw = now;
    try {
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      context.globalCompositeOperation = "lighter";
      for (let index = 0; index < ambientCount; index++) {
        const offset = index * 4;
        const depth = ambient[offset + 2];
        const x = ambient[offset] * width + Math.sin(time * (.12 + depth * .06) + ambient[offset + 3] * 20) * (12 + depth * 22) + cursorX * depth * 12;
        const y = ambient[offset + 1] * height + Math.cos(time * (.1 + depth * .05) + ambient[offset + 3] * 17) * (10 + depth * 18) + cursorY * depth * 8;
        const size = 1.1 + depth * 2.2;
        context.fillStyle = index % 3 ? "rgba(169, 132, 235, .24)" : "rgba(176, 211, 255, .3)";
        context.fillRect(x - size * .5, y - size * .5, size, size);
      }

      const rect = anchor.getBoundingClientRect();
      const centerX = rect.left + rect.width * .5;
      const centerY = rect.top + rect.height * .5;
      const scale = Math.min(rect.width * .37, rect.height * .3);
      const assistantTop = assistant.getBoundingClientRect().top + scrollY;
      const progress = clamp(scrollY / Math.max(height * .45, assistantTop - height * .65));
      const breath = 1 + Math.sin(time * .8) * .012;
      const paths = [new Path2D(), new Path2D(), new Path2D()];

      for (let index = 0; index < count; index++) {
        const point = index * 3;
        const seed = data.seeds[index];
        const spread = smoothstep(seed * .15, .82 + seed * .18, progress);
        const localX = (data.positions[point] - source.particleMeta.pivot[0]) * scale * breath;
        const localY = (data.positions[point + 1] - source.particleMeta.pivot[1]) * scale * breath;
        const depth = data.positions[point + 2] - source.particleMeta.pivot[2];
        const homeX = centerX + localX + cursorX * (9 + depth * 8);
        const homeY = centerY - localY + cursorY * (6 + depth * 5);
        const destinationX = width * .5 + data.scatter[point] * width * .84 + Math.sin(time * .12 + seed * 30) * 12;
        const destinationY = height * .5 - data.scatter[point + 1] * height * .84 + Math.cos(time * .1 + seed * 20) * 12;
        let x = homeX + (destinationX - homeX) * spread;
        let y = homeY + (destinationY - homeY) * spread;

        if (pointerActive && spread < .8) {
          const dx = x - pointerX;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy);
          const influence = 1 - smoothstep(0, 90, distance);
          if (distance > 1) { x += dx / distance * influence * 18; y += dy / distance * influence * 18; }
        }

        const size = (compact ? 1.45 : 1.75) * (1 + Math.max(-.3, Math.min(.5, depth)) * .22) * (1 - spread * .18);
        const path = paths[groups[index]];
        path.moveTo(x, y - size);
        path.lineTo(x + size * .86, y + size * .55);
        path.lineTo(x - size * .86, y + size * .55);
        path.closePath();
      }

      const alpha = .56 + Math.sin(time * .55) * .035;
      context.fillStyle = `rgba(201, 220, 255, ${alpha})`; context.fill(paths[0]);
      context.fillStyle = `rgba(199, 158, 255, ${alpha * .92})`; context.fill(paths[1]);
      context.fillStyle = `rgba(151, 190, 255, ${alpha * .82})`; context.fill(paths[2]);
      context.globalCompositeOperation = "source-over";

      host.dataset.progress = progress.toFixed(3);
      host.dataset.atmosphereTime = time.toFixed(3);
      host.dataset.atmosphereMode = "animated";
      host.dataset.renderState = "running";
      host.dataset.quality = compact ? "canvas-compact" : "canvas";
      if (!ready) { ready = true; onReady(); }
      schedule();
    } catch {
      onFailure();
    }
  };

  const pointerMove = (event: PointerEvent) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    cursorX = (event.clientX / Math.max(1, width) - .5) * 2;
    cursorY = (event.clientY / Math.max(1, height) - .5) * 2;
    pointerX = event.clientX;
    pointerY = event.clientY;
    pointerActive = true;
    schedule();
  };
  const pointerLeave = () => { pointerActive = false; cursorX = 0; cursorY = 0; };
  const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else schedule(); };
  window.addEventListener("pointermove", pointerMove, { passive: true });
  document.addEventListener("pointerleave", pointerLeave);
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("resize", resize);
  schedule();

  return {
    setPaused(value) { paused = value; host.dataset.renderState = paused ? "paused" : "running"; if (paused) { cancelAnimationFrame(frame); frame = 0; } else schedule(); },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", pointerMove);
      document.removeEventListener("pointerleave", pointerLeave);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("resize", resize);
      canvas.remove();
    },
  };
}
