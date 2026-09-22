import type { Metadata } from "next";
import Link from "next/link";
import { InnerShell } from "@/components/inner-shell";
import { ProjectGlyph } from "@/components/project-glyph";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Agentic AI & DevOps Projects | Ahmad Hassan",
  description: "Explore Ahmad Hassan’s agentic AI, RAG, AWS and data engineering projects, including OpsPilot AI, InsightLoop and CloudOps Knowledge Assistant.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <InnerShell>
      <section className="inner-hero" aria-labelledby="projects-page-title">
        <p className="eyebrow section-index"><span />SELECTED SYSTEMS / 01 | 03</p>
        <h1 id="projects-page-title">Work that makes<br /><span>intelligence inspectable.</span></h1>
        <p>Agentic systems, data investigation and cloud operations, presented with their architecture, evidence and honest boundaries.</p>
      </section>
      <section className="project-index" aria-label="Project case studies">
        {PROJECTS.map(project => (
          <article className="case-card" key={project.slug}>
            <ProjectGlyph project={project} />
            <div className="case-card-copy">
              <div className="project-meta"><span className="eyebrow">{project.number} / {project.category}</span><span className="project-status">{project.status}</span></div>
              <h2>{project.name}</h2><p className="case-card-headline">{project.headline}</p><p>{project.summary}</p>
              <p className="case-card-stack">{project.stack.join(" · ")}</p>
              <Link className="section-evidence" href={`/projects/${project.slug}`}>VIEW CASE STUDY <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </section>
    </InnerShell>
  );
}
