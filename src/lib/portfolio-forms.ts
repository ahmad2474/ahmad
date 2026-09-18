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

/** A sculptural four-point agent sigil; decorative, never identity geometry. */
export function createAgentDestinations(count: number) {
  const points = new Float32Array(count * 3), random = seeded(910);
  for (let i = 0; i < count; i++) {
    let x: number, y: number, z: number;
    const kind = random(), a = random() * Math.PI * 2;
    if (kind < .85) {
      const radius = random() < .28 ? 1 : .3 + .7 * Math.sqrt(random());
      x = .37 * Math.cos(a) ** 3 * radius;
      y = .39 * Math.sin(a) ** 3 * radius;
      z = Math.sin(a * 2) * .11 * Math.sin(radius * Math.PI) + (random() - .5) * .012;
    } else if (kind < .93) {
      const elevation = random() * 2 - 1, r = .035 * Math.sqrt(1 - elevation ** 2);
      x = Math.cos(a) * r; y = Math.sin(a) * r; z = elevation * .035;
    } else {
      x = Math.cos(a) * .42; y = Math.sin(a) * .12;
      z = Math.sin(a) * .26;
    }
    points.set([x, y, z], i * 3);
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
    // A closed ribbon: query and observation return into the same agent loop.
    const a = random() * Math.PI * 2, width = (random() - .5) * .07;
    const x = .33 * Math.sin(a) + width * Math.cos(a);
    const y = .22 * Math.sin(a * 2) + width * Math.sin(a);
    const z = .12 * Math.cos(a) + width * Math.sin(a * 2);
    points.set([x, y, z], i * 3);
  }
  return points;
}
