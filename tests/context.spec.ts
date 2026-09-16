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

test("same particles become source documents, pause and reverse back into the agent loop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const stage = page.locator(".particle-stage");
  await expect(stage).toHaveAttribute("data-status", "ready");
  const canvas = await stage.locator("canvas").elementHandle();
  const top = await page.locator(".context-chapter").evaluate(el => el.getBoundingClientRect().top + scrollY);
  await page.evaluate(top => scrollTo({ top: top + innerHeight * .2, behavior: "instant" }), top);
  await expect.poll(async () => Number(await stage.getAttribute("data-context"))).toBeGreaterThan(.99);
  await expect(page.locator("#context-title")).toBeInViewport();
  await expect(page.locator(".context-static-points").first()).toHaveCSS("opacity", "0");
  await expect(page.getByText("IN DEVELOPMENT", { exact: true })).toBeVisible();
  expect(await canvas!.evaluate(el => el.isConnected)).toBe(true);
  await page.screenshot({ path: "docs/review/context-desktop.png" });
  await page.getByRole("button", { name: "Pause motion" }).click();
  const context = await stage.getAttribute("data-context");
  await page.evaluate(() => scrollTo({ top: 2000, behavior: "instant" }));
  await page.waitForTimeout(300);
  expect(await stage.getAttribute("data-context")).toBe(context);
  await page.getByRole("button", { name: "Resume motion" }).click();
  await expect.poll(async () => Number(await stage.getAttribute("data-context"))).toBeLessThan(.01);
  await expect.poll(async () => Number(await stage.getAttribute("data-gather"))).toBeGreaterThan(.99);
  expect(await canvas!.evaluate(el => el.isConnected)).toBe(true);
  expect(errors).toEqual([]);
});

test("context remains readable with reduced motion and after actual WebGL context loss", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
  await page.locator("canvas").evaluate((canvas: HTMLCanvasElement) => canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context")?.loseContext());
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "fallback");
  await expect(page.locator(".context-static-points").first()).toHaveCSS("opacity", "0.5");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("link", { name: "FOLLOW THE EVIDENCE" }).click();
  await expect(page.locator("#context-pipeline")).toBeInViewport();
  await expect(page.locator(".context-step")).toHaveCount(3);
  for (const heading of ["Find the relevant context.", "Respect the boundary.", "Let evidence lead."]) await expect(page.getByRole("heading", { name: heading })).toBeVisible();
});

test("phone and enlarged text recompose the context chapter without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#context").scrollIntoViewIfNeeded();
  await page.screenshot({ path: "docs/review/context-mobile-390.png", fullPage: true });
  for (const size of ["100%", "200%"]) {
    await page.addStyleTag({ content: `html { font-size: ${size}; }` });
    const overflow = await page.locator(".context-chapter").evaluate(el => [...el.querySelectorAll("h2,h3,p,a,span,li")].filter(node => { const r = node.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1 || node.scrollWidth > node.clientWidth + 1); }).map(node => node.textContent));
    expect(overflow).toEqual([]);
    const heading = await page.locator(".context-heading").boundingBox();
    const visual = await page.locator(".context-field").boundingBox();
    expect(visual!.y).toBeGreaterThan(heading!.y + heading!.height);
    const source = await page.locator(".source-label").boundingBox();
    const pages = await page.locator(".context-particle-anchor").boundingBox();
    const evidence = await page.locator(".evidence-label").boundingBox();
    expect(pages!.y).toBeGreaterThan(source!.y + source!.height);
    expect(evidence!.y).toBeGreaterThan(pages!.y + pages!.height);
  }
});

test("agent visual aligns with the heading, cards form one row and recompose on phones", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 860 });
  await page.goto("/");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page.locator("#agentic-title")).toBeInViewport();
  const heading = await page.locator(".chapter-heading").boundingBox();
  const visual = await page.locator(".agentic-network").boundingBox();
  expect(visual!.x).toBeGreaterThanOrEqual(heading!.x + heading!.width);
  expect(visual!.height).toBeLessThanOrEqual(650);
  const boxes = await page.locator(".phase-story").evaluateAll(elements => elements.map(el => el.getBoundingClientRect().toJSON()));
  expect(Math.max(...boxes.map(box => box.y)) - Math.min(...boxes.map(box => box.y))).toBeLessThan(1);
  for (let i = 1; i < boxes.length; i++) expect(boxes[i].x).toBeGreaterThan(boxes[i - 1].right);
  expect(boxes[0].y).toBeGreaterThan(visual!.y + visual!.height);
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.locator(".agentic-stage")).toHaveCSS("position", "relative");
  for (const phase of [0, 1, 2]) await expect(page.locator(`[data-phase-story="${phase}"]`)).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  const phoneBoxes = await page.locator(".phase-story").evaluateAll(elements => elements.map(el => el.getBoundingClientRect().toJSON()));
  for (let i = 1; i < phoneBoxes.length; i++) expect(phoneBoxes[i].y).toBeGreaterThan(phoneBoxes[i - 1].bottom);
});

test("CloudOps gathers the same particles, keeps planned data readable and survives context loss", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  const stage = page.locator(".particle-stage");
  await expect(stage).toHaveAttribute("data-status", "ready");
  const canvas = await stage.locator("canvas").elementHandle();
  const top = await page.locator(".cloudops-chapter").evaluate(el => el.getBoundingClientRect().top + scrollY);
  await page.evaluate(top => scrollTo({ top: top + innerHeight * .2, behavior: "instant" }), top);
  await expect.poll(async () => Number(await stage.getAttribute("data-project"))).toBeGreaterThan(.99);
  expect(await canvas!.evaluate(el => el.isConnected)).toBe(true);
  await expect(page.locator(".cloudops-static-cloud")).toHaveCSS("opacity", "0");
  await expect(page.getByText("PLANNED KNOWLEDGE & EVALUATION", { exact: true })).toBeVisible();
  await expect(page.locator(".cloudops-data dt")).toHaveText(["222DOCUMENTS", "115INTERNAL DOCUMENTS", "315EVALUATION QUESTIONS"]);
  await expect(page.locator(".cloudops-chapter")).not.toContainText("⟨");
  await page.screenshot({ path: "docs/review/unified-cloudops-desktop.png" });
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(async () => Number(await stage.getAttribute("data-project"))).toBeLessThan(.01);
  await expect.poll(async () => Number(await stage.getAttribute("data-progress"))).toBeLessThan(.01);
  await canvas!.evaluate((canvas: HTMLCanvasElement) => canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context")?.loseContext());
  await expect(stage).toHaveAttribute("data-status", "fallback");
  await expect(page.locator(".cloudops-static-cloud")).toHaveCSS("opacity", "0.5");
  await expect(page.locator(".cloudops-capability")).toHaveCount(3);
});

test("all chapter cards and CloudOps labels stay readable at 320px and 200 percent text", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  const overflow = await page.evaluate(() => [...document.querySelectorAll(".agentic-chapter h2,.agentic-chapter h3,.agentic-chapter p,.context-chapter h2,.context-step,.cloudops-chapter h2,.cloudops-chapter h3,.cloudops-chapter p,.cloudops-chapter li,.cloudops-chapter dt,.cloudops-chapter dd")].filter(el => { const r = el.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1 || el.scrollWidth > el.clientWidth + 1); }).map(el => el.textContent));
  expect(overflow).toEqual([]);
  const visual = await page.locator(".cloudops-particle-anchor").boundingBox();
  const labels = await page.locator(".cloudops-node-labels").boundingBox();
  const caption = await page.locator(".cloudops-field figcaption").boundingBox();
  expect(labels!.y).toBeGreaterThan(visual!.y + visual!.height);
  expect(caption!.y).toBeGreaterThan(labels!.y + labels!.height);
});
