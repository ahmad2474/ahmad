export const EVIDENCE_PAGES = [
  { x: .18, y: .3, angle: -.22 },
  { x: .2, y: .66, angle: .14 },
  { x: .44, y: .45, angle: -.09 },
] as const;

export const CLOUDOPS_NODES = [
  ...EVIDENCE_PAGES.map((page, i) => ({ ...page, label: ["RETRIEVE", "AUTHORIZE", "REVIEW"][i], detail: ["Titan V2 + BM25", "Search-time ACLs", "Review Bench + evals"][i] })),
  { x: .73, y: .49, label: "GROUND", detail: "Citations + abstention" },
];

export const CLOUDOPS_ROUTES = EVIDENCE_PAGES.map(page =>
  [page.x + .09, page.y, .57, page.y, .61, .49, .73, .49] as const);

/** Floating evidence pages converge into a faceted grounding core. Planned, not a live run. */
export function createCloudOpsDestinations(count: number) {
  const positions = new Float32Array(count * 3);
  let state = 7315;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  for (let i = 0; i < count; i++) {
    let x: number, y: number, z: number;
    const kind = random();
    if (kind < .63) {
      const page = EVIDENCE_PAGES[Math.floor(random() * EVIDENCE_PAGES.length)];
      let px: number, py: number;
      const part = random();
      if (part < .5) {
        if (random() < .5) { px = (random() < .5 ? -1 : 1) * .085; py = (random() - .5) * .24; }
        else { px = (random() - .5) * .17; py = (random() < .5 ? -1 : 1) * .12; }
      } else if (part < .9) {
        const line = Math.floor(random() * 4);
        px = -.053 + random() * (line === 3 ? .065 : .106);
        py = -.052 + line * .035 + (random() - .5) * .006;
      } else { px = (random() - .5) * .16; py = (random() - .5) * .23; }
      x = page.x + px * Math.cos(page.angle) - py * Math.sin(page.angle);
      y = page.y + px * Math.sin(page.angle) + py * Math.cos(page.angle);
      z = .045 + px * .35 + (random() - .5) * .008;
    } else if (kind < .88) {
      let a = random(), b = random();
      if (a + b > 1) { a = 1 - a; b = 1 - b; }
      x = .73 + a * .14 * (random() < .5 ? -1 : 1);
      y = .49 + b * .18 * (random() < .5 ? -1 : 1);
      z = (1 - a - b) * .13 * (random() < .5 ? -1 : 1);
    } else {
      const p = CLOUDOPS_ROUTES[Math.floor(random() * CLOUDOPS_ROUTES.length)];
      const t = random(), s = 1 - t;
      x = s ** 3 * p[0] + 3 * s ** 2 * t * p[2] + 3 * s * t ** 2 * p[4] + t ** 3 * p[6];
      y = s ** 3 * p[1] + 3 * s ** 2 * t * p[3] + 3 * s * t ** 2 * p[5] + t ** 3 * p[7];
      z = Math.sin(t * Math.PI) * .08;
    }
    positions.set([x - .5, .5 - y, z], i * 3);
  }
  return positions;
}
