"use client";

import { useEffect, useRef, useState } from "react";
import { mountParticles, type ParticleController } from "@/lib/particle-renderer";

const PORTRAIT_META = { count: 44000, pivot: [0, -0.411522633744856, 0.0823045267489712], stride: 12 };

export function AgenticScene() {
  const mount = useRef<HTMLDivElement>(null);
  const controller = useRef<ParticleController | null>(null);
  const [status, setStatus] = useState<"static" | "ready" | "fallback">("static");
  const [diagnostics, setDiagnostics] = useState<string[] | null>(null);

  useEffect(() => {
    const target = mount.current;
    if (!target) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let generation = 0;
    let disposed = false;
    let retryCount = 0;
    let retryTimer = 0;
    let startupTimer = 0;
    let loadController: AbortController | null = null;
    const clearTimers = () => {
      window.clearTimeout(retryTimer);
      window.clearTimeout(startupTimer);
      retryTimer = 0;
      startupTimer = 0;
    };
    const release = () => {
      clearTimers();
      loadController?.abort();
      loadController = null;
      controller.current?.dispose();
      controller.current = null;
      document.documentElement.removeAttribute("data-particles");
      document.documentElement.removeAttribute("data-particle-engine");
    };
    const configure = async (resetRetries = true) => {
      const current = ++generation;
      release();
      setStatus("static");
      if (resetRetries) retryCount = 0;
      if (media.matches) return;
      const ready = () => {
        if (disposed || current !== generation) return;
        window.clearTimeout(startupTimer);
        startupTimer = 0;
        retryCount = 0;
        document.documentElement.dataset.particles = "ready";
        document.documentElement.dataset.particleEngine = "webgl";
        setStatus("ready");
      };
      const recover = () => {
        if (disposed || current !== generation || media.matches) return;
        release();
        document.documentElement.dataset.particles = "fallback";
        setStatus("fallback");
        if (retryCount >= 2) return;
        const delay = retryCount === 0 ? 650 : 1600;
        retryCount++;
        retryTimer = window.setTimeout(() => void configure(false), delay);
      };
      try {
        loadController = new AbortController();
        const response = await fetch("/portraits/ahmad-particles-v1.bin", {
          cache: retryCount ? "reload" : "force-cache",
          signal: loadController.signal,
        });
        if (!response.ok) throw new Error(`Portrait data request failed: ${response.status}`);
        const particleBuffer = await response.arrayBuffer();
        if (disposed || current !== generation) return;
        controller.current = mountParticles(target, { particleBuffer, particleMeta: PORTRAIT_META }, () => {
          // Leave the failed render callback before disposing its GL resources.
          target.dataset.failureReason = "WebGL rendering stopped";
          queueMicrotask(recover);
        }, () => { delete target.dataset.failureReason; ready(); });
        // A visible page should produce its first draw promptly. Recover if a
        // browser creates a context but never schedules a usable first frame.
        startupTimer = window.setTimeout(() => {
          if (!document.hidden && current === generation && document.documentElement.dataset.particles !== "ready") recover();
        }, 8000);
      } catch (error) {
        target.dataset.failureReason = error instanceof Error ? error.message : "Particle renderer failed";
        recover();
      }
    };
    void configure();
    const preferenceChanged = () => void configure(true);
    const pageHidden = () => {
      generation++;
      release();
      setStatus("static");
    };
    const pageShown = (event: PageTransitionEvent) => { if (event.persisted) void configure(true); };
    const online = () => { if (!controller.current && !media.matches) void configure(true); };
    media.addEventListener("change", preferenceChanged);
    window.addEventListener("pagehide", pageHidden);
    window.addEventListener("pageshow", pageShown);
    window.addEventListener("online", online);
    return () => {
      disposed = true;
      generation++;
      media.removeEventListener("change", preferenceChanged);
      window.removeEventListener("pagehide", pageHidden);
      window.removeEventListener("pageshow", pageShown);
      window.removeEventListener("online", online);
      release();
    };
  }, []);

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("particle-debug")) return;
    let previousTime = "";
    const probe = document.createElement("canvas");
    let webglSupport = "unavailable";
    try {
      const webgl2 = probe.getContext("webgl2", { alpha: true, depth: false, stencil: false, powerPreference: "low-power" });
      const webgl1 = webgl2 ? null : probe.getContext("webgl", { alpha: true, depth: false, stencil: false, powerPreference: "low-power" });
      webglSupport = webgl2 ? "WebGL 2" : webgl1 ? "WebGL 1 only" : "unavailable";
      (webgl2 || webgl1)?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch { webglSupport = "probe failed"; }
    const update = () => {
      const target = mount.current;
      const canvas = target?.querySelector("canvas");
      const time = target?.dataset.atmosphereTime || "none";
      const motion = time !== "none" && time !== previousTime ? "advancing" : "stalled";
      previousTime = time;
      setDiagnostics([
        `stage: ${target?.dataset.status || "missing"}`,
        `render: ${target?.dataset.renderState || "none"}`,
        `engine: ${document.documentElement.dataset.particleEngine || "none"}`,
        `clock: ${time} | ${motion}`,
        `quality: ${target?.dataset.quality || "none"}`,
        `canvas: ${canvas ? "present" : "missing"}`,
        `Chrome graphics: ${webglSupport}`,
        `reduced motion: ${matchMedia("(prefers-reduced-motion: reduce)").matches ? "yes" : "no"}`,
        `last WebGL error: ${target?.dataset.failureReason || "none"}`,
      ]);
    };
    update();
    const timer = window.setInterval(update, 750);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <div className="atmosphere-fallback" aria-hidden="true" />
      <div ref={mount} className="particle-stage" data-status={status} aria-hidden="true" />
      {diagnostics && <output className="particle-diagnostics" aria-live="polite"><strong>PARTICLE DIAGNOSTICS</strong>{diagnostics.map(line => <span key={line.split(":")[0]}>{line}</span>)}</output>}
    </>
  );
}
