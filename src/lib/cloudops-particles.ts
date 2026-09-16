export const CLOUDOPS_NODES = [
  { x: .15, y: .26, label: "RETRIEVE", detail: "Titan V2 + BM25" },
  { x: .85, y: .26, label: "AUTHORIZE", detail: "Search-time ACLs" },
  { x: .85, y: .72, label: "GROUND", detail: "Citations + abstention" },
  { x: .15, y: .72, label: "REVIEW", detail: "Review Bench + evals" },
] as const;

export const CLOUDOPS_ROUTES = [
  [.15, .26, .3, .18, .38, .25, .5, .34],
  [.5, .34, .62, .25, .7, .18, .85, .26],
  [.85, .26, .96, .4, .96, .58, .85, .72],
  [.85, .72, .7, .85, .3, .85, .15, .72],
  [.15, .72, .04, .58, .04, .4, .15, .26],
] as const;

/** Planned architecture destinations, independent of the portrait source. */
export function createCloudOpsDestinations(count: number) {
  const positions = new Float32Array(count * 3);
  let state = 7315;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  for (let i = 0; i < count; i++) {
    let x: number, y: number, z: number;
    // Seeded random assignment avoids periodic aliasing in adaptive draw budgets.
    const kind = random();
    if (kind < .5) {
      const angle = random() * Math.PI * 2;
      const level = Math.floor(random() * 9);
      const radius = .17 * (.7 + random() * .3);
      x = .5 + Math.cos(angle) * radius;
      y = .29 + level * .042;
      z = Math.sin(angle) * radius;
    } else if (kind < .8) {
      const p = CLOUDOPS_ROUTES[Math.floor(random() * CLOUDOPS_ROUTES.length)];
      const t = random(), s = 1 - t;
      x = s ** 3 * p[0] + 3 * s ** 2 * t * p[2] + 3 * s * t ** 2 * p[4] + t ** 3 * p[6];
      y = s ** 3 * p[1] + 3 * s ** 2 * t * p[3] + 3 * s * t ** 2 * p[5] + t ** 3 * p[7];
      x += (random() - .5) * .008; y += (random() - .5) * .008;
      z = (random() - .5) * .035;
    } else {
      const node = CLOUDOPS_NODES[Math.floor(random() * CLOUDOPS_NODES.length)];
      const angle = random() * Math.PI * 2;
      const elevation = random() * 2 - 1;
      const radius = .027 * Math.sqrt(1 - elevation * elevation);
      x = node.x + Math.cos(angle) * radius;
      y = node.y + Math.sin(angle) * radius;
      z = elevation * .027;
    }
    positions.set([x - .5, .5 - y, z], i * 3);
  }
  return positions;
}
