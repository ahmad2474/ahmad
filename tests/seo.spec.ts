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

test("robots permits homepage/resources and sitemap contains only the canonical homepage", async ({ request }) => {
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
  expect(xml.match(/<loc>/g)?.length ?? 0).toBe(production ? 1 : 0);
  if (production) expect(xml).toContain(`<loc>${SITE_URL}/</loc>`);
  expect(xml).not.toMatch(/#identity|#projects|\/api\//);
});
