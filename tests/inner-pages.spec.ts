import { test, expect } from "@playwright/test";

const projects = [
  ["opspilot-ai", "OpsPilot AI", "SOURCE AVAILABLE"],
  ["insightloop", "InsightLoop", "SOURCE AVAILABLE"],
  ["cloudops-knowledge-assistant", "CloudOps Knowledge Assistant", "IN DEVELOPMENT"],
] as const;

test("project index exposes three crawlable case studies", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects");
  await expect(page).toHaveTitle("Agentic AI & DevOps Projects | Ahmad Hassan");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Work that makes");
  for (const [slug, name] of projects) await expect(page.locator(".case-card", { hasText: name }).getByRole("link", { name: "VIEW CASE STUDY" })).toHaveAttribute("href", `/projects/${slug}`);
  await expect(page.locator(".case-card")).toHaveCount(3);
});

for (const [slug, name, status] of projects) {
  test(`${name} has distinct metadata and honest status`, async ({ page }) => {
    await page.goto(`/projects/${slug}`);
    await expect(page).toHaveTitle(`${name} Case Study | Ahmad Hassan`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(name);
    await expect(page.locator(".case-study")).toContainText(status);
    await expect(page.locator(".architecture-grid article")).toHaveCount(3);
    await expect(page.locator(".case-boundary")).toBeVisible();
  });
}

test("journal launches as an honest empty editorial surface", async ({ page }) => {
  await page.goto("/blog");
  await expect(page).toHaveTitle("Agentic AI Engineering Journal | Ahmad Hassan");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Build notes");
  await expect(page.locator(".journal-empty")).toContainText("not automated news rewrites");
  await expect(page.locator(".journal-card")).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

for (const width of [390, 1440]) {
  test(`inner pages match the responsive visual system at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/projects/opspilot-ai");
    await expect(page.locator(".inner-atmosphere")).toBeVisible();
    await expect(page.locator(".project-glyph")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `/tmp/ahmad-case-${width}.png`, fullPage: true });
    await page.goto("/blog");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `/tmp/ahmad-blog-${width}.png`, fullPage: true });
  });
}
