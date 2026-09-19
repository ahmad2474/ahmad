import type { Metadata } from "next";
import Link from "next/link";
import { InnerShell } from "@/components/inner-shell";
import { JOURNAL_ARTICLES } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Agentic AI Engineering Journal | Ahmad Hassan",
  description: "Original engineering notes and analysis from Ahmad Hassan on agentic AI, RAG, evaluation and cloud infrastructure.",
  alternates: { canonical: "/blog" },
  robots: JOURNAL_ARTICLES.length ? undefined : { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <InnerShell>
      <section className="inner-hero journal-hero" aria-labelledby="journal-title">
        <p className="eyebrow section-index"><span />FIELD NOTES / JOURNAL</p>
        <h1 id="journal-title">Build notes.<br /><span>Useful analysis.</span></h1>
        <p>Original writing on agentic AI, RAG, evaluation and the infrastructure behind reliable systems.</p>
      </section>
      <section className="journal-index" aria-label="Journal articles">
        {JOURNAL_ARTICLES.length ? JOURNAL_ARTICLES.map((article, index) => (
          <article className="journal-card" key={article.slug}>
            <span className="journal-number">{String(index + 1).padStart(2, "0")}</span>
            <div><p className="eyebrow">{article.tags.join(" / ")}</p><h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p>{article.summary}</p><div className="journal-meta"><time dateTime={article.published}>{article.published}</time><span>{article.readingTime}</span></div></div>
          </article>
        )) : (
          <div className="journal-empty">
            <span className="journal-signal" aria-hidden="true">✦</span><p className="eyebrow">EDITORIAL DESK / PREPARING</p>
            <h2>The journal is being assembled.</h2>
            <p>The structure is ready. The first entries will be sourced, owner-reviewed engineering articles—not automated news rewrites.</p>
            <Link className="section-evidence" href="/projects">EXPLORE PROJECTS <span aria-hidden="true">↗</span></Link>
          </div>
        )}
      </section>
    </InnerShell>
  );
}
