import { test, expect, type Route } from "@playwright/test";

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
