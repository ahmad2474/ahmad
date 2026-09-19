import type { MetadataRoute } from "next";
import { SITE_URL, isIndexableDeployment } from "@/lib/site-seo";
import { PROJECTS } from "@/lib/projects";
import { JOURNAL_ARTICLES } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexableDeployment()) return [];
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/projects` },
    ...PROJECTS.map(project => ({ url: `${SITE_URL}/projects/${project.slug}` })),
    ...(JOURNAL_ARTICLES.length ? [
      { url: `${SITE_URL}/blog` },
      ...JOURNAL_ARTICLES.map(article => ({ url: `${SITE_URL}/blog/${article.slug}` })),
    ] : []),
  ];
}
