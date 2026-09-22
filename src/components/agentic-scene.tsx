"use client";

import { useEffect, useRef, useState } from "react";
import { mountParticles, type ParticleController } from "@/lib/particle-renderer";

const PORTRAIT_META = { count: 44000, pivot: [0, -0.411522633744856, 0.0823045267489712], stride: 12 };

export function AgenticScene() {
  const mount = useRef<HTMLDivElement>(null);
  const controller = useRef<ParticleController | null>(null);
  const [status, setStatus] = useState<"static" | "ready" | "fallback">("static");

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
    };
    const configure = async (resetRetries = true) => {
      const current = ++generation;
      release();
      setStatus("static");
      if (resetRetries) retryCount = 0;
      if (media.matches) return;
      const recover = () => {
        if (disposed || current !== generation || media.matches) return;
        release();
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
          queueMicrotask(recover);
        }, () => {
          if (disposed || current !== generation) return;
          window.clearTimeout(startupTimer);
          startupTimer = 0;
          retryCount = 0;
          document.documentElement.dataset.particles = "ready";
          setStatus("ready");
        });
        // A visible page should produce its first draw promptly. Recover if a
        // browser creates a context but never schedules a usable first frame.
        startupTimer = window.setTimeout(() => {
          if (!document.hidden && current === generation && document.documentElement.dataset.particles !== "ready") recover();
        }, 8000);
      } catch { recover(); }
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

  return (
    <>
      <div className="atmosphere-fallback" aria-hidden="true" />
      <div ref={mount} className="particle-stage" data-status={status} aria-hidden="true" />
    </>
  );
}
