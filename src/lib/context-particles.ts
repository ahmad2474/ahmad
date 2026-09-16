/** Decorative document destinations for the same particles. No identity geometry. */
export function createContextDestinations(count: number) {
  const positions = new Float32Array(count * 3);
  let state = 3302;
  const random = () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
  const angle = -9 * Math.PI / 180;
  for (let i = 0; i < count; i++) {
    const layer = i % 3;
    let x: number, y: number;
    if (i % 10 < 3) {
      // Paper perimeter, with sufficient depth to read as separated sheets.
      const edge = Math.floor(random() * 4);
      x = edge < 2 ? (edge === 0 ? 195 : 655) : 195 + random() * 460;
      y = edge < 2 ? 300 + random() * 500 : (edge === 2 ? 300 : 800);
    } else {
      const row = Math.floor(random() * 11);
      x = 235 + random() * (row % 3 === 0 ? 270 : 370);
      y = 440 + row * 26 + (random() - .5) * 3;
    }
    const dx = x - 450, dy = y - 530;
    x = 450 + dx * Math.cos(angle) - dy * Math.sin(angle) + layer * 95;
    y = 530 + dx * Math.sin(angle) + dy * Math.cos(angle) - layer * 75;
    positions.set([x / 1000 - .5, .5 - y / 1000, layer * -.065 + (random() - .5) * .01], i * 3);
  }
  return positions;
}
