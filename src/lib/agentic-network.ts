export const NETWORK_NODES = [
  { x: .18, y: .25, label: "Reason", detail: "Plan the next step" },
  { x: .82, y: .25, label: "Act", detail: "Call the right tool" },
  { x: .5, y: .85, label: "Verify", detail: "Inspect the evidence" },
] as const;

export const NETWORK_ROUTES = [
  [.18, .25, .35, .04, .65, .04, .82, .25],
  [.82, .25, 1, .5, .79, .88, .5, .85],
  [.5, .85, .21, .88, 0, .5, .18, .25],
] as const;

export const NETWORK_SPOKES = NETWORK_NODES.map(node => [.5, .46, .5, node.y, node.x, .46, node.x, node.y] as const);

/** Procedural destinations for the existing portrait particles, never identity geometry. */
export function createNetworkDestinations(count: number) {
  const positions = new Float32Array(count * 3);
  const nodes = new Float32Array(count);
  const flows = new Float32Array(count);
  let state = 1024;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  for (let i = 0; i < count; i++) {
    const kind = i % 10;
    let x: number, y: number, z: number;
    if (kind < 7) {
      const satellite = kind >= 4;
      const node = i % 3;
      const center = satellite ? NETWORK_NODES[node] : { x: .5, y: .46 };
      const angle = random() * Math.PI * 2;
      const elevation = random() * 2 - 1;
      const radius = (satellite ? .057 : .195) * (.78 + random() * .22);
      const ring = Math.sqrt(1 - elevation * elevation);
      x = center.x + Math.cos(angle) * ring * radius;
      y = center.y + Math.sin(angle) * ring * radius;
      z = elevation * radius;
      nodes[i] = satellite ? node + 1 : 0;
      flows[i] = -10;
    } else {
      const route = i % 3;
      const t = random(), s = 1 - t;
      const p = kind === 9 ? NETWORK_SPOKES[route] : NETWORK_ROUTES[route];
      x = s ** 3 * p[0] + 3 * s ** 2 * t * p[2] + 3 * s * t ** 2 * p[4] + t ** 3 * p[6];
      y = s ** 3 * p[1] + 3 * s ** 2 * t * p[3] + 3 * s * t ** 2 * p[5] + t ** 3 * p[7];
      x += (random() - .5) * .008; y += (random() - .5) * .008;
      z = (random() - .5) * .03;
      nodes[i] = 4;
      flows[i] = kind === 9 ? -10 : route + t;
    }
    positions.set([x - .5, .5 - y, z], i * 3);
  }
  return { positions, nodes, flows };
}
