import { test, expect, type Route } from "@playwright/test";

test("portrait geometry survives a transient asset request failure", async ({ page }) => {
  let requests = 0;
  await page.route("**/portraits/ahmad-particles-v1.bin", route => {
    requests++;
    return requests === 1 ? route.fulfill({ status: 503, body: "temporary" }) : route.continue();
  });
  await page.goto("/");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "fallback");
  await expect(page.locator(".portrait-fallback")).toBeVisible();
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready", { timeout: 6000 });
  await expect(page.locator("canvas")).toHaveCount(1);
  expect(requests).toBeGreaterThanOrEqual(2);
});

test("failed WebGL gets a Canvas 2D particle scene and useful diagnostics", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof getContext>) {
      if (String(args[0]).includes("webgl")) return null;
      return getContext.apply(this, args);
    } as typeof getContext;
  });
  await page.goto("/?particle-debug=1");
  const stage = page.locator(".particle-stage");
  await expect(stage).toHaveAttribute("data-status", "ready", { timeout: 6000 });
  await expect(page.locator("html")).toHaveAttribute("data-particle-engine", "canvas2d");
  await expect(page.locator(".particle-diagnostics")).toContainText("engine: canvas2d");
  await expect(page.locator(".particle-diagnostics")).toContainText("canvas: present");
  const before = Number(await stage.getAttribute("data-atmosphere-time"));
  await page.waitForTimeout(400);
  expect(Number(await stage.getAttribute("data-atmosphere-time"))).toBeGreaterThan(before);
  await page.mouse.move(300, 240);
  await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "instant" }));
  await expect.poll(async () => Number(await stage.getAttribute("data-progress"))).toBeGreaterThan(.5);
});

test("stable portrait binary has the authoritative geometry length", async ({ request }) => {
  const response = await request.get("/portraits/ahmad-particles-v1.bin");
  expect(response.ok()).toBe(true);
  expect(response.headers()["cache-control"]).toContain("immutable");
  expect((await response.body()).byteLength).toBe(44000 * 12);
});

test("particle scene remounts after inner-page navigation and repeated reloads", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  const stage = page.locator(".particle-stage");
  await expect(stage).toHaveAttribute("data-status", "ready");
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.evaluate(() => Object.assign(window, { innerPageWindowMarker: true }));
  await page.getByRole("link", { name: "Home", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  expect(await page.evaluate(() => "innerPageWindowMarker" in window)).toBe(false);
  await expect(stage).toHaveAttribute("data-status", "ready");
  for (let reload = 0; reload < 2; reload++) {
    await page.reload();
    await expect(stage).toHaveAttribute("data-status", "ready");
    const before = Number(await stage.getAttribute("data-atmosphere-time"));
    await page.waitForTimeout(350);
    const after = Number(await stage.getAttribute("data-atmosphere-time"));
    expect(after).toBeGreaterThan(before);
    await expect(page.locator("canvas")).toHaveCount(1);
  }
});

for (const width of [1440, 390]) {
  test(`refresh keeps a transparent portrait until the first WebGL draw at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.addInitScript(() => {
      const diagnostics = { draws: 0, readyBeforeDraw: false };
      Object.assign(window, { hologramLoading: diagnostics });
      for (const method of ["drawArrays", "drawElements"] as const) {
        const original = WebGL2RenderingContext.prototype[method];
        Object.defineProperty(WebGL2RenderingContext.prototype, method, {
          configurable: true, writable: true,
          value: function (this: WebGL2RenderingContext, ...args: number[]) {
            diagnostics.draws++;
            return Reflect.apply(original, this, args);
          },
        });
      }
      new MutationObserver(() => {
        if (document.documentElement.dataset.particles === "ready" && diagnostics.draws === 0) diagnostics.readyBeforeDraw = true;
      }).observe(document, { subtree: true, attributes: true, attributeFilter: ["data-particles"] });
    });
    let released = false;
    const held: Route[] = [];
    await page.route("**/_next/static/chunks/*.js", route => released ? route.continue() : void held.push(route));
    await page.goto("/", { waitUntil: "commit" });
    await expect(page.locator(".portrait-fallback img")).toBeVisible();
    const alpha = await page.locator(".portrait-fallback img").evaluate(async (image: HTMLImageElement) => {
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(image, 0, 0);
      return ctx.getImageData(0, 0, 1, 1).data[3];
    });
    expect(alpha).toBe(0);
    await expect(page.locator(".particle-stage")).toBeHidden();
    await page.screenshot({ path: `/tmp/ahmad-refresh-static-${width}.png` });
    released = true;
    await Promise.all(held.map(route => route.continue()));
    await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
    await expect(page.locator(".particle-stage")).toBeVisible();
    await expect(page.locator(".portrait-fallback")).toBeHidden();
    await page.screenshot({ path: `/tmp/ahmad-refresh-live-${width}.png` });
    for (let i = 0; i < 2; i++) {
      await page.reload();
      await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
      const diagnostics = await page.evaluate(() => (window as unknown as { hologramLoading: { draws: number; readyBeforeDraw: boolean } }).hologramLoading);
      expect(diagnostics.draws).toBeGreaterThan(0);
      expect(diagnostics.readyBeforeDraw).toBe(false);
    }
  });
}
