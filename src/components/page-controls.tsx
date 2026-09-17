"use client";

import { useEffect, useState } from "react";

export function PageControls() {
  const [belowHero, setBelowHero] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const observer = new IntersectionObserver(() => setBelowHero(hero.getBoundingClientRect().bottom <= 0));
    observer.observe(hero);

    // Brief easing for stepped desktop wheels. Touch, precision trackpads,
    // keyboard scrolling and independently scrolling panels stay native.
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0, target = scrollY;
    const cancel = () => { cancelAnimationFrame(frame); frame = 0; target = scrollY; };
    const wheel = (event: WheelEvent) => {
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (event.defaultPrevented || !event.cancelable || reduced.matches || !mouse.matches || event.ctrlKey || event.metaKey || event.shiftKey || event.deltaX || Math.abs(delta) < 40) { cancel(); return; }
      let element = event.target instanceof Element ? event.target : null;
      while (element && element !== document.body) {
        if (/(auto|scroll)/.test(getComputedStyle(element).overflowY) && element.scrollHeight > element.clientHeight) { cancel(); return; }
        element = element.parentElement;
      }
      const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      target = Math.min(max, Math.max(0, (frame ? target : scrollY) + delta));
      if (target === scrollY) { cancel(); return; }
      event.preventDefault();
      cancelAnimationFrame(frame);
      const from = scrollY, to = target, start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 160);
        window.scrollTo({ top: from + (to - from) * (1 - (1 - progress) ** 3), behavior: "instant" });
        frame = progress < 1 ? requestAnimationFrame(tick) : 0;
      };
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("keydown", cancel);
    window.addEventListener("pointerdown", cancel);
    window.addEventListener("hashchange", cancel);
    window.addEventListener("resize", cancel);
    reduced.addEventListener("change", cancel);
    return () => {
      observer.disconnect(); cancel();
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("pointerdown", cancel);
      window.removeEventListener("hashchange", cancel);
      window.removeEventListener("resize", cancel);
      reduced.removeEventListener("change", cancel);
    };
  }, []);

  return belowHero ? <a className="back-to-top" href="#identity" aria-label="Back to top" onClick={() => requestAnimationFrame(() => document.querySelector<HTMLElement>(".wordmark")?.focus({ preventScroll: true }))}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
  </a> : null;
}
