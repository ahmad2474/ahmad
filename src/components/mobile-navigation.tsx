"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function MobileNavigation() {
  const menu = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLElement>(null);
  useEffect(() => {
    const disclosure = menu.current;
    const expanded = () => toggle.current?.setAttribute("aria-expanded", String(disclosure?.open ?? false));
    expanded(); disclosure?.addEventListener("toggle", expanded);
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target) && menu.current) menu.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false; toggle.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { disclosure?.removeEventListener("toggle", expanded); document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, []);
  const navigate = (href: string) => {
    if (menu.current) menu.current.open = false;
    if (href.startsWith("#")) requestAnimationFrame(() => document.querySelector<HTMLElement>(href)?.focus({ preventScroll: true }));
  };
  return (
    <details className="mobile-menu" ref={menu}>
      <summary className="mobile-menu-toggle" ref={toggle} role="button" aria-label="Toggle navigation menu" aria-controls="mobile-navigation">
        <span className="menu-lines" aria-hidden="true"><span /><span /><span /></span>
      </summary>
      <nav id="mobile-navigation" aria-label="Main navigation">
        <Link className="nav-link" href="/#ahmad-ai" onClick={() => navigate("/#ahmad-ai")}>Ahmad.AI</Link>
        <Link className="nav-link" href="/projects" onClick={() => navigate("/projects")}>Work</Link>
        <Link className="nav-link" href="/blog" onClick={() => navigate("/blog")}>Journal</Link>
        <Link className="nav-link" href="/#contact" onClick={() => navigate("/#contact")}>Contact</Link>
        <a className="nav-link" href="https://github.com/ahmad2474" onClick={() => navigate("https://github.com/ahmad2474")}>GitHub <span aria-hidden="true">↗</span></a>
      </nav>
    </details>
  );
}
