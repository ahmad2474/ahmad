import type { MetadataRoute } from "next";
import { SITE_URL, isIndexableDeployment } from "@/lib/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Section anchors belong to the homepage, not separate indexed pages.
  return isIndexableDeployment() ? [{ url: `${SITE_URL}/` }] : [];
}
