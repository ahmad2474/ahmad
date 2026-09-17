import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`back-to-top appears after the hero and returns focus home at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const arrow = page.getByRole("link", { name: "Back to top" });
    await expect(arrow).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Pause motion" })).toHaveCount(0);
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await expect(arrow).toBeVisible();
    await arrow.focus(); await page.keyboard.press("Enter");
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await expect(arrow).toHaveCount(0);
    await expect(page.locator(".wordmark")).toBeFocused();
  });
}

test("brief desktop wheel easing preserves distance and bypasses scrolling panels and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  // Wait for the client controls to hydrate before testing input.
  await page.locator("#projects").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: "Back to top" })).toBeVisible();
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  const samples = await page.evaluate(async () => {
    const wheel = new WheelEvent("wheel", { deltaY: 300, bubbles: true, cancelable: true });
    document.querySelector("h1")!.dispatchEvent(wheel);
    const immediate = scrollY;
    await new Promise(resolve => setTimeout(resolve, 60));
    const intermediate = scrollY;
    await new Promise(resolve => setTimeout(resolve, 200));
    return { prevented: wheel.defaultPrevented, immediate, intermediate, final: scrollY };
  });
  expect(samples.prevented).toBe(true);
  expect(samples.immediate).toBe(0);
  expect(samples.intermediate).toBeGreaterThan(0);
  expect(samples.intermediate).toBeLessThan(300);
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(300);
  const panel = await page.locator(".chat-log").evaluate(el => {
    el.appendChild(Object.assign(document.createElement("div"), { textContent: "Scrollable content" }));
    (el.lastElementChild as HTMLElement).style.height = "1000px";
    const event = new WheelEvent("wheel", { deltaY: 100, bubbles: true, cancelable: true });
    el.dispatchEvent(event);
    return event.defaultPrevented;
  });
  expect(panel).toBe(false);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const prevented = await page.evaluate(() => {
    const event = new WheelEvent("wheel", { deltaY: 100, bubbles: true, cancelable: true });
    document.querySelector("h1")!.dispatchEvent(event);
    return event.defaultPrevented;
  });
  expect(prevented).toBe(false);
});
