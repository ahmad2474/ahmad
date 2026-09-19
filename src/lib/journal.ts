export type JournalArticle = {
  slug: string;
  title: string;
  summary: string;
  published: string;
  readingTime: string;
  tags: readonly string[];
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
};

// Publish only sourced, owner-reviewed writing here. The journal landing intentionally
// ships empty rather than manufacturing news summaries for search traffic.
export const JOURNAL_ARTICLES: readonly JournalArticle[] = [];

export function getJournalArticle(slug: string) {
  return JOURNAL_ARTICLES.find(article => article.slug === slug);
}
