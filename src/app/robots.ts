import type { MetadataRoute } from "next";
import { SITE_URL, isIndexableDeployment } from "@/lib/site-seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // Allow crawlers to read the noindex meta/header on review deployments.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: isIndexableDeployment() ? `${SITE_URL}/sitemap.xml` : undefined,
  };
}
