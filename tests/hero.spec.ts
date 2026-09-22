import { test, expect, type Page } from "@playwright/test";

async function openMobileMenu(page: Page) {
  const toggle = page.getByRole("button", { name: "Toggle navigation menu" });
  if (await toggle.isVisible()) await toggle.click();
}

for (const width of [320, 390, 768, 1024, 1440, 1920]) {
  test(`readable layout and real destinations at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(() => [...document.querySelectorAll("h1,h2,h3,p,a,dt,dd")]
      .filter(el => !el.classList.contains("skip-link"))
      .filter(el => { const r = el.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1 || el.scrollWidth > el.clientWidth + 1); })
      .map(el => el.textContent));
    expect(overflow).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width <= 1100) {
      const caption = await page.locator(".field-caption").boundingBox();
      const notes = await page.locator(".engineering-notes").boundingBox();
      expect(notes!.y).toBeGreaterThanOrEqual(caption!.y + caption!.height);
    }
    await expect(page.locator(".portrait-fallback img")).toBeVisible();
    expect(await page.locator(".portrait-fallback img").evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    await expect(page.locator("canvas")).toHaveCount(0);

    await expect(page.getByRole("link", { name: /Chat on WhatsApp/ })).toHaveAttribute("href", "https://wa.me/923026849341");
    await expect(page.getByRole("link", { name: "SCROLL TO EXPLORE" })).toHaveCount(0);
    await openMobileMenu(page);
    await page.getByRole("link", { name: "Ahmad.AI", exact: true }).click();
    await expect(page).toHaveURL(/#ahmad-ai$/);
    await expect(page.locator("#assistant-title")).toBeInViewport();
    expect(errors).toEqual([]);
  });
}

test("keyboard skip link and primary action retain visible focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.keyboard.press("Tab");
  const cta = page.getByRole("link", { name: /Chat on WhatsApp/ });
  await expect(cta).toBeFocused();
  await expect(cta).toHaveCSS("outline-style", "solid");
  await expect(cta).toHaveAttribute("href", "https://wa.me/923026849341");
  await expect(cta).toHaveAttribute("target", "_blank");
  await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
});

test("same live canvas responds to pointer, dissolves and reconstructs", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  const stage = page.locator(".particle-stage");
  await expect(stage).toHaveAttribute("data-status", "ready");
  await expect(stage.locator("canvas")).toHaveAttribute("data-particle-count", "7374");
  await page.mouse.move(1300, 300);
  await expect.poll(async () => Number(await stage.getAttribute("data-rotation"))).toBeGreaterThan(.6);
  const canvas = await stage.locator("canvas").elementHandle();
  await page.evaluate(() => window.scrollTo({ top: 1150, behavior: "instant" }));
  await expect.poll(async () => Number(await stage.getAttribute("data-progress"))).toBeGreaterThan(.95);
  expect(await canvas!.evaluate(el => el.isConnected)).toBe(true);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(async () => Number(await stage.getAttribute("data-progress"))).toBeLessThan(.01);
  await expect(page.getByRole("button", { name: "Pause motion" })).toHaveCount(0);
});

test("changing reduced motion removes WebGL and restores the static portrait", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator(".portrait-fallback")).toBeVisible();
  await expect(page.locator(".atmosphere-fallback")).toBeVisible();
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
  await expect(page.locator("canvas")).toHaveCount(1);
  await expect(page.locator(".atmosphere-fallback")).toBeHidden();
});

test("WebGL context loss restores the fallback, then rebuilds the scene", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
  await page.locator("canvas").evaluate((canvas: HTMLCanvasElement) => canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context")?.loseContext());
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "fallback");
  await expect(page.locator(".portrait-fallback")).toBeVisible();
  await expect(page.locator(".atmosphere-fallback")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready", { timeout: 5000 });
  await expect(page.locator("canvas")).toHaveCount(1);
  await expect(page.locator(".portrait-fallback")).toBeHidden();
});

test("a transient WebGL startup failure recovers without a refresh", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    const allowedAt = performance.now() + 1200;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).includes("webgl") && performance.now() < allowedAt) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "fallback");
  await expect(page.locator(".portrait-fallback")).toBeVisible();
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready", { timeout: 6000 });
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("page lifecycle releases the old context and restores a cached page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent("pagehide", { persisted: true })));
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "static");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true })));
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
  await expect(page.locator("canvas")).toHaveCount(1);
});

test("failed WebGL initialization uses Canvas 2D particles and keeps links usable", async ({ page }) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof getContext>) {
      if (String(args[0]).includes("webgl")) return null;
      return getContext.apply(this, args);
    } as typeof getContext;
  });
  await page.goto("/");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready", { timeout: 6000 });
  await expect(page.locator("html")).toHaveAttribute("data-particle-engine", "canvas2d");
  await expect(page.locator("canvas[data-particle-engine=canvas2d]")).toHaveCount(1);
  await openMobileMenu(page);
  await page.getByRole("link", { name: "Ahmad.AI", exact: true }).click();
  await expect(page).toHaveURL(/#ahmad-ai$/);
});

test("phone uses the reduced particle budget and retains touch scrolling", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3001");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
  await expect(page.locator("canvas")).toHaveAttribute("data-particle-count", "3022");
  await page.evaluate(() => window.scrollTo({ top: 250, behavior: "instant" }));

  await page.evaluate(() => window.scrollTo({ top: 1400, behavior: "instant" }));
  await expect.poll(async () => Number(await page.locator(".particle-stage").getAttribute("data-progress"))).toBeGreaterThan(.8);
  await context.close();
});

test("identity and anchors remain useful without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3001");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".portrait-fallback img")).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await openMobileMenu(page);
  await page.getByRole("link", { name: "Ahmad.AI", exact: true }).click();
  await expect(page).toHaveURL(/#ahmad-ai$/);
  await expect(page.locator(".agent-symbol .form-fallback")).toHaveCSS("opacity", "0.65");
  await expect(page.locator(".no-script-projects")).toContainText("in development");
  await context.close();
});

test("mobile navigation opens with keyboard and closes on Escape, outside click and selection", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle navigation menu" });
  const menu = page.locator(".mobile-menu");
  await expect(page.getByRole("link", { name: "Work", exact: true })).toHaveCount(0);
  await toggle.focus(); await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Ahmad.AI", exact: true })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click(); await page.locator(".wordmark").click();
  await expect(menu).not.toHaveAttribute("open");
  await toggle.click(); await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(menu).not.toHaveAttribute("open");
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Work that makes");
});

for (const width of [320, 390, 1280]) {
  test(`200 percent text reflows the scene at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    const copy = await page.locator(".hero-copy").boundingBox();
    const portrait = await page.locator(".identity-field").boundingBox();
    const actions = await page.locator(".hero-actions").boundingBox();
    expect(portrait!.y).toBeGreaterThanOrEqual(copy!.y + copy!.height);
    expect(actions!.y).toBeGreaterThanOrEqual(portrait!.y + portrait!.height);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const clipped = await page.evaluate(() => [...document.querySelectorAll("h1,h2,h3,p,a,nav,dt,dd")]
      .filter(el => !el.classList.contains("skip-link"))
      .filter(el => { const r = el.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1 || el.scrollWidth > el.clientWidth + 1); })
      .map(el => el.textContent));
    expect(clipped).toEqual([]);
  });
}

test("portrait particles gather into a reversible agent loop; phase links work with keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const stage = page.locator(".particle-stage");
  await expect(stage).toHaveAttribute("data-status", "ready");
  const canvas = await stage.locator("canvas").elementHandle();
  const chapter = page.locator(".agentic-chapter");
  await expect(page.locator(".agentic-stage")).toHaveCSS("position", "relative");
  for (const phase of [0, 1, 2]) {
    await page.locator(`[data-phase-link="${phase}"]`).click();
    await expect(chapter).toHaveAttribute("data-phase", String(phase));
    await expect.poll(async () => Number(await stage.getAttribute("data-gather"))).toBeGreaterThan(.99);
    await expect(page.locator(`[data-phase-story="${phase}"]`)).toBeVisible();
    await expect(page.locator(`[data-phase-link="${phase}"]`)).toHaveAttribute("aria-current", "step");
    for (const story of [0, 1, 2]) await expect(page.locator(`[data-phase-story="${story}"]`)).toBeVisible();
    expect(await canvas!.evaluate(el => el.isConnected)).toBe(true);
  }

  const reason = page.locator('[data-phase-link="0"]');
  await reason.focus();
  await page.keyboard.press("Enter");
  await expect(chapter).toHaveAttribute("data-phase", "0");
  await page.locator('[data-phase-link="2"]').click();
  await expect(page.locator('[data-phase-story="2"]')).toBeVisible();
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(async () => Number(await stage.getAttribute("data-gather"))).toBeLessThan(.01);
  await expect.poll(async () => Number(await stage.getAttribute("data-progress"))).toBeLessThan(.01);
  expect(await canvas!.evaluate(el => el.isConnected)).toBe(true);
  expect(errors).toEqual([]);
});

test("reduced motion and context loss restore every agent explanation and its static diagram", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
  await page.locator("canvas").evaluate((canvas: HTMLCanvasElement) => canvas.getContext("webgl2")?.getExtension("WEBGL_lose_context")?.loseContext());
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "fallback");
  for (const phase of [0, 1, 2]) await expect(page.locator(`[data-phase-story="${phase}"]`)).toBeVisible();
  await expect(page.locator(".network-static-cloud")).toHaveCSS("opacity", "0.5");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".agentic-stage")).toHaveCSS("position", "relative");
  await page.locator('[data-phase-link="2"]').click();
  await expect(page.locator("#agent-verify")).toBeInViewport();
});

test("phone chapter keeps every explanation in document flow and loop links reach their text", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".particle-stage")).toHaveAttribute("data-status", "ready");
  await expect(page.locator(".agentic-stage")).toHaveCSS("position", "relative");
  for (const phase of [0, 1, 2]) await expect(page.locator(`[data-phase-story="${phase}"]`)).toBeVisible();
  await page.locator('[data-phase-link="2"]').click();
  await expect(page.locator("#agent-verify")).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
