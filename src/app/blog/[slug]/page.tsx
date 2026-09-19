import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerShell } from "@/components/inner-shell";
import { JOURNAL_ARTICLES, getJournalArticle } from "@/lib/journal";

export function generateStaticParams() { return JOURNAL_ARTICLES.map(article => ({ slug: article.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = getJournalArticle((await params).slug);
  if (!article) return {};
  return { title: `${article.title} | Ahmad Hassan`, description: article.summary, alternates: { canonical: `/blog/${article.slug}` } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getJournalArticle((await params).slug);
  if (!article) notFound();
  return (
    <InnerShell><article className="journal-article"><header><Link className="text-link" href="/blog"><span aria-hidden="true">←</span> JOURNAL</Link><p className="eyebrow">{article.tags.join(" / ")}</p><h1>{article.title}</h1><p>{article.summary}</p><div className="journal-meta"><time dateTime={article.published}>{article.published}</time><span>{article.readingTime}</span></div></header><div className="article-body">{article.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div></article></InnerShell>
  );
}
