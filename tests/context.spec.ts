import { test, expect } from "@playwright/test";
import { CLOUDOPS_NODES, createCloudOpsDestinations } from "../src/lib/cloudops-particles";

test("every architecture terminal remains populated through both adaptive quality budgets", () => {
  const count = 9000;
  const positions = createCloudOpsDestinations(count);
  for (const budget of [1, .65, .45]) {
    const drawn = Math.floor(count * budget);
    for (const node of CLOUDOPS_NODES) {
      let populated = 0;
      for (let i = 0; i < drawn; i++) {
        const index = Math.floor(i * count / drawn) * 3;
        const dx = positions[index] - (node.x - .5), dy = positions[index + 1] - (.5 - node.y);
        if (dx * dx + dy * dy < .04 * .04) populated++;
      }
      expect(populated, `${node.label} at ${budget * 100}%`).toBeGreaterThan(drawn * .03);
    }
  }
});
