export interface PortraitSource { particleData: string; particleMeta: { count: number; stride: number; pivot: number[] } }

/** Decode the user-supplied portrait geometry without generating facial features. */
export function createPortraitParticles(count: number, source: PortraitSource) {
  const { particleData, particleMeta } = source;
  const binary = atob(particleData);
  if (particleMeta.stride !== 12 || binary.length !== particleMeta.count * particleMeta.stride) throw new Error("Invalid portrait particle data");
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  const view = new DataView(bytes.buffer);
  // Choose one supplied point per spatial cell, rather than thinning record order.
  // This removes overlapping clusters without inventing new facial positions.
  const compact = count <= 12000;
  const cellSize = compact ? .04 : .02;
  const cells = new Map<string, { index: number; distance: number; sum: number; samples: number }>();
  for (let i = 0; i < particleMeta.count; i++) {
    const offset = i * particleMeta.stride;
    const x = view.getInt16(offset, true) / 4000;
    const y = view.getInt16(offset + 2, true) / 4000;
    const cx = Math.floor(x / cellSize), cy = Math.floor(y / cellSize);
    const key = `${cx},${cy}`;
    const distance = (x - (cx + .5) * cellSize) ** 2 + (y - (cy + .5) * cellSize) ** 2;
    const cell = cells.get(key);
    if (cell) {
      cell.sum += bytes[offset + 9] / 255; cell.samples++;
      if (distance < cell.distance) { cell.index = i; cell.distance = distance; }
    } else cells.set(key, { index: i, distance, sum: bytes[offset + 9] / 255, samples: 1 });
  }
  const selected = [...cells.values()];
  count = Math.min(count, selected.length);
  const positions = new Float32Array(count * 3);
  const scatter = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const seeds = new Float32Array(count);
  const weights = new Float32Array(count);
  const intensities = new Float32Array(count);
  const fades = new Float32Array(count);
  const normals = new Float32Array(count * 3);
  let seed = 2474;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < count; i++) {
    // Sample the complete portrait at every quality level, not just the first rows.
    const cell = selected[Math.floor(i * selected.length / count)];
    const offset = cell.index * particleMeta.stride;
    positions.set([view.getInt16(offset, true) / 4000, view.getInt16(offset + 2, true) / 4000, view.getInt16(offset + 4, true) / 4000], i * 3);
    const intensity = cell.sum / cell.samples;
    normals.set([view.getInt8(offset + 6) / 127, view.getInt8(offset + 7) / 127, view.getInt8(offset + 8) / 127], i * 3);
    intensities[i] = intensity;
    weights[i] = bytes[offset + 10] / 255;
    fades[i] = bytes[offset + 11] / 255;
    const angle = random() * Math.PI * 2;
    const r = .23 + Math.sqrt(random()) * .66;
    scatter.set([Math.cos(angle) * r, Math.sin(angle) * r, random() * 2 - 1], i * 3);
    // Coherent violet side-light plus pale lilac highlights, rather than color noise.
    const violet = random() < .32;
    const tint = .2 + .55 * Math.max(0, Math.min(1, (positions[i * 3] + .8) / 1.6));
    const cyan = [.63 + intensity * .22, .83 + intensity * .12, 1];
    const purple = [.81 + intensity * .12, .54 + intensity * .16, 1];
    colors.set(violet ? purple : cyan.map((value, channel) => value + (purple[channel] - value) * tint), i * 3);
    // Keep most glyphs consistent; a few larger fragments articulate depth.
    sizes[i] = 2 * (random() < .035 ? (compact ? 5 : 7) : (compact ? 3.5 : 5.2) + random() * .35);
    seeds[i] = random();
  }
  return { positions, scatter, colors, sizes, seeds, weights, intensities, fades, normals };
}
