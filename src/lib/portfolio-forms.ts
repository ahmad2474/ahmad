import { createCloudOpsDestinations } from "./cloudops-particles";

export const INFRA_NODES = [
  { x: .5, y: .16, label: "PROVISION", detail: "Terraform" },
  { x: .18, y: .5, label: "DEPLOY", detail: "Containers + CI" },
  { x: .82, y: .5, label: "OPERATE", detail: "Traces + boundaries" },
  { x: .5, y: .83, label: "DATA", detail: "AWS services" },
] as const;

function seeded(seed: number) {
  let state = seed;
  return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
}

/** Recognizable abstract bot glyph, extruded in depth; never human identity geometry. */
export function createAgentDestinations(count: number) {
  const points = new Float32Array(count * 3), random = seeded(910);
  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    const kind = random(), a = random() * Math.PI * 2;
    if (kind < .57) {
      // A rounded rectangular head, with sparse interior reconstruction bands.
      const c = Math.cos(a), s = Math.sin(a);
      const radius = random() < .7 ? 1 : .45 + random() * .5;
      x = .5 + Math.sign(c) * Math.pow(Math.abs(c), .45) * .255 * radius;
      y = .49 + Math.sign(s) * Math.pow(Math.abs(s), .45) * .19 * radius;
    } else if (kind < .77) {
      x = (random() < .5 ? .4 : .6) + Math.cos(a) * .027;
      y = .46 + Math.sin(a) * .044;
    } else if (kind < .86) {
      x = .43 + random() * .14; y = .59 + (random() - .5) * .009;
    } else if (kind < .92) {
      x = .5 + (random() - .5) * .008; y = .19 + random() * .1;
    } else {
      x = .5 + Math.cos(a) * .36;
      y = .5 + Math.sin(a) * .3;
    }
    points.set([x - .5, .5 - y, (random() - .5) * .16], i * 3);
  }
  return points;
}

export function createInfrastructureDestinations(count: number) {
  const points = new Float32Array(count * 3), random = seeded(1610);
  for (let i = 0; i < count; i++) {
    const kind = random(), a = random() * Math.PI * 2;
    let x: number, y: number, z: number;
    if (kind < .42) {
      const node = INFRA_NODES[Math.floor(random() * INFRA_NODES.length)];
      const elevation = random() * 2 - 1, r = .064 * Math.sqrt(1 - elevation ** 2);
      x = node.x + Math.cos(a) * r; y = node.y + Math.sin(a) * r; z = elevation * .064;
    } else if (kind < .76) {
      const node = INFRA_NODES[Math.floor(random() * INFRA_NODES.length)], t = random();
      x = .5 + (node.x - .5) * t + (random() - .5) * .008;
      y = .5 + (node.y - .5) * t + (random() - .5) * .008;
      z = Math.sin(t * Math.PI) * .045;
    } else {
      const radius = .135 + random() * .02;
      x = .5 + Math.cos(a) * radius; y = .5 + Math.sin(a) * radius * .7; z = Math.sin(a) * radius;
    }
    points.set([x - .5, .5 - y, z], i * 3);
  }
  return points;
}

export type ProjectKey = "opspilot" | "insightloop" | "cloudops";
export const OPSPILOT_NODES = Array.from({ length: 6 }, (_, i) => {
  const angle = i * Math.PI / 3 - Math.PI / 2;
  return { x: .5 + Math.cos(angle) * .31, y: .5 + Math.sin(angle) * .31 };
});
export function createProjectDestinations(key: ProjectKey, count: number) {
  if (key === "cloudops") return createCloudOpsDestinations(count);
  if (key === "opspilot") {
    const points = new Float32Array(count * 3), random = seeded(1517);
    for (let i = 0; i < count; i++) {
      const kind = random(), a = random() * Math.PI * 2;
      let x: number, y: number, z: number;
      if (kind < .4) {
        const elevation = random() * 2 - 1, r = .1 * Math.sqrt(1 - elevation ** 2);
        x = .5 + Math.cos(a) * r; y = .5 + Math.sin(a) * r; z = elevation * .1;
      } else if (kind < .7) {
        const node = OPSPILOT_NODES[Math.floor(random() * OPSPILOT_NODES.length)], r = .035;
        x = node.x + Math.cos(a) * r; y = node.y + Math.sin(a) * r; z = (random() - .5) * .05;
      } else if (kind < .88) {
        const r = random() < .5 ? .31 : .39;
        x = .5 + Math.cos(a) * r; y = .5 + Math.sin(a) * r; z = Math.sin(a) * .025;
      } else {
        const node = OPSPILOT_NODES[Math.floor(random() * OPSPILOT_NODES.length)], t = random();
        x = .5 + (node.x - .5) * t; y = .5 + (node.y - .5) * t; z = (random() - .5) * .01;
      }
      points.set([x - .5, .5 - y, z], i * 3);
    }
    return points;
  }
  const points = new Float32Array(count * 3), random = seeded(280);
  for (let i = 0; i < count; i++) {
    const column = Math.floor(random() * 5), kind = random();
    let x: number, y: number, z: number;
    if (kind < .75) {
      const h = [.2, .32, .24, .42, .34][column];
      x = .26 + column * .12 + (random() - .5) * .055;
      y = .72 - random() * h;
      z = (random() - .5) * .065;
    } else {
      const a = random() * Math.PI * 2;
      x = .5 + Math.cos(a) * .36; y = .5 + Math.sin(a) * .32; z = Math.sin(a) * .07;
    }
    points.set([x - .5, .5 - y, z], i * 3);
  }
  return points;
}
