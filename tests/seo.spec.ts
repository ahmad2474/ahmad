import { test, expect } from "@playwright/test";
import { SITE_URL, SITE_HOST, isIndexableDeployment } from "../src/lib/site-seo";

const production = process.env.VERCEL_ENV === "production";

test("only the production environment opts into indexing", () => {
  expect(isIndexableDeployment("production")).toBe(true);
  for (const environment of ["preview", "development", "staging", ""]) expect(isIndexableDeployment(environment)).toBe(false);
});

test("homepage metadata matches the deployment policy and canonical site", async ({ request }) => {
  const response = await request.get("/", { headers: { host: SITE_HOST, "user-agent": "Googlebot" } });
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toMatch(new RegExp(`<link rel="canonical" href="${SITE_URL.replaceAll(".", "\\.")}/?"`));
  expect(html).toContain(production ? 'name="robots" content="index, follow"' : 'name="robots" content="noindex, nofollow"');
  expect(response.headers()["x-robots-tag"]).toBeUndefined();
  expect(html).toContain("Lahore, Pakistan");
});

test("alternate hosts and the assistant API cannot be indexed", async ({ request }) => {
  const alternate = await request.get("/", { headers: { host: "portfolio-review.vercel.app" } });
  expect(alternate.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  const api = await request.get("/api/ahmad", { headers: { host: SITE_HOST } });
  expect(api.headers()["x-robots-tag"]).toBe("noindex, nofollow");
});

test("robots permits public pages and sitemap contains canonical indexable routes", async ({ request }) => {
  const robots = await request.get("/robots.txt", { headers: { host: SITE_HOST } });
  expect(robots.status()).toBe(200);
  const rules = await robots.text();
  expect(rules).toContain("Allow: /");
  expect(rules).toContain("Disallow: /api/");
  if (production) expect(rules).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`);
  else expect(rules).not.toContain("Sitemap:");
  const sitemap = await request.get("/sitemap.xml", { headers: { host: SITE_HOST } });
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml.match(/<loc>/g)?.length ?? 0).toBe(production ? 5 : 0);
  if (production) for (const path of ["/", "/projects", "/projects/opspilot-ai", "/projects/insightloop", "/projects/cloudops-knowledge-assistant"]) expect(xml).toContain(`<loc>${SITE_URL}${path}</loc>`);
  expect(xml).not.toContain(`<loc>${SITE_URL}/blog</loc>`);
  expect(xml).not.toMatch(/#identity|#projects|\/api\//);
});

test("public profile and every project are represented in server-rendered HTML", async ({ request }) => {
  const response = await request.get("/", { headers: { host: SITE_HOST, "user-agent": "Googlebot" } });
  const html = await response.text();
  expect(html).toContain("<title>Ahmad Hassan | Agentic AI Developer in Lahore</title>");
  expect(html).toContain('class="hero-location">Based in Lahore, Pakistan.</p>');
  const script = html.match(/<script id="ahmad-profile" type="application\/ld\+json">([\s\S]*?)<\/script>/);
  expect(script).not.toBeNull();
  const profile = JSON.parse(script![1]);
  expect(profile["@type"]).toBe("ProfilePage");
  expect(profile.mainEntity["@type"]).toBe("Person");
  expect(profile.mainEntity.name).toBe("Ahmad Hassan");
  expect(profile.mainEntity.sameAs).toEqual(["https://github.com/ahmad2474", "https://linkedin.com/in/ahmadhassan102"]);
  expect(profile.mainEntity).not.toHaveProperty("worksFor");
  for (const key of ["opspilot", "insightloop", "cloudops"]) expect(html).toContain(`id="project-panel-${key}"`);
  expect(html).toContain("An agentic data analyst investigates");
  expect(html).toContain("retrieval-augmented generation (RAG) system in development");
});

for (const width of [1440, 390]) {
  test(`location introduction and project tabs retain the compact layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator(".hero-location")).toBeVisible();
    await expect(page.getByRole("tab", { name: /OpsPilot/ })).toHaveAttribute("aria-controls", "project-panel-opspilot");
    await expect(page.getByRole("tabpanel")).toHaveCount(1);
    await expect(page.locator(".project-panel")).toHaveCount(3);
    await expect(page.locator(".narrative-section,.hero")).toHaveCount(6);
    await page.screenshot({ path: `/tmp/ahmad-seo-hero-${width}.png` });
    await page.getByRole("tab", { name: /InsightLoop/ }).click();
    await expect(page.getByRole("tabpanel")).toHaveAttribute("id", "project-panel-insightloop");
    await page.getByRole("tab", { name: /CloudOps/ }).click();
    await expect(page.getByRole("tabpanel")).toHaveAttribute("id", "project-panel-cloudops");
    await expect(page.getByRole("tabpanel")).toContainText("IN DEVELOPMENT");
    await page.screenshot({ path: `/tmp/ahmad-seo-project-${width}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
