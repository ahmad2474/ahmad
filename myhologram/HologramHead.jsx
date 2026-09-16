'use client';

/*
 * <HologramHead /> — portrait particle hologram for Next.js / React
 * Install: npm i three
 * Files: HologramHead.jsx, hologramCore.js, portraitParticles.js (same folder)
 *
 * Usage:
 *   const holo = useRef(null);
 *   <div style={{ position: 'absolute', inset: 0 }}>
 *     <HologramHead ref={holo} />
 *   </div>
 *
 * The head follows the cursor by default (about 20° left/right, 10° up/down).
 * Hooks for later, on holo.current:
 *   setScatter(0..1)          drive from scroll progress
 *   setPointerStrength(0..1)  particles part around the cursor
 *   setFollowCursor(bool)
 */

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import * as THREE from 'three';
import { createHologram } from './hologramCore';

const HologramHead = forwardRef(function HologramHead(
  { className, style, count = 44000, mobileCount = 22000, followCursor = true, colorA, colorB, colorC },
  ref
) {
  const containerRef = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let api = null;

    import('./portraitParticles').then(({ particleData, particleMeta }) => {
      if (cancelled || !containerRef.current) return;
      const options = { data: particleData, meta: particleMeta, count, mobileCount, followCursor };
      if (colorA) options.colorA = colorA;
      if (colorB) options.colorB = colorB;
      if (colorC) options.colorC = colorC;
      api = createHologram(THREE, containerRef.current, options);
      apiRef.current = api;
    });

    return () => {
      cancelled = true;
      if (api) api.dispose();
      apiRef.current = null;
    };
  }, [count, mobileCount, followCursor, colorA, colorB, colorC]);

  useImperativeHandle(ref, () => ({
    setScatter: (v) => apiRef.current?.setScatter(v),
    setPointer: (x, y) => apiRef.current?.setPointer(x, y),
    setPointerStrength: (v) => apiRef.current?.setPointerStrength(v),
    setFollowCursor: (on) => apiRef.current?.setFollowCursor(on),
  }), []);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden="true"
      style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none', ...style }}
    />
  );
});

export default HologramHead;
