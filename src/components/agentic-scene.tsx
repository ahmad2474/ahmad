"use client";

import { useEffect, useRef, useState } from "react";
import type { ParticleController } from "@/lib/particle-renderer";

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
    const configure = async () => {
      const current = ++generation;
      controller.current?.dispose();
      controller.current = null;
      document.documentElement.removeAttribute("data-particles");
      setStatus("static");
      if (media.matches) return;
      try {
        const [{ mountParticles }, source] = await Promise.all([
          import("@/lib/particle-renderer"), import("../../myhologram/portraitParticles"),
        ]);
        if (disposed || current !== generation) return;
        controller.current = mountParticles(target, source, () => {
          controller.current?.dispose();
          controller.current = null;
          document.documentElement.removeAttribute("data-particles");
          setStatus("fallback");
        });
        document.documentElement.dataset.particles = "ready";
        setStatus("ready");
      } catch {
        if (!disposed && current === generation) setStatus("fallback");
      }
    };
    void configure();
    media.addEventListener("change", configure);
    return () => {
      disposed = true;
      generation++;
      media.removeEventListener("change", configure);
      controller.current?.dispose();
      controller.current = null;
      document.documentElement.removeAttribute("data-particles");
    };
  }, []);

  return (
    <>
      <div className="atmosphere-fallback" aria-hidden="true" />
      <div ref={mount} className="particle-stage" data-status={status} aria-hidden="true" />
    </>
  );
}
