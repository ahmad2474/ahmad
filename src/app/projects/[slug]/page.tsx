import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InnerShell } from "@/components/inner-shell";
import { ProjectGlyph } from "@/components/project-glyph";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() { return PROJECTS.map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} Case Study | Ahmad Hassan`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const current = PROJECTS.findIndex(item => item.slug === project.slug);
  const next = PROJECTS[(current + 1) % PROJECTS.length];
  return (
    <InnerShell>
      <article className="case-study">
        <header className="case-study-hero">
          <div className="case-study-intro">
            <Link className="text-link" href="/projects"><span aria-hidden="true">←</span> ALL PROJECTS</Link>
            <div className="project-meta"><span className="eyebrow">{project.number} / {project.category}</span><span className="project-status">{project.status}</span></div>
            <h1>{project.name}<span>.</span></h1>
            <p className="case-study-lead">{project.headline}</p><p>{project.summary}</p>
          </div>
          <ProjectGlyph project={project} />
        </header>
        <div className="case-study-body">
          <aside className="case-facts" aria-label="Project facts">
            <div><span>STATUS</span><strong>{project.status}</strong></div>
            <div><span>STACK</span><strong>{project.stack.join(" · ")}</strong></div>
            <div><span>VISUAL</span><strong>{project.visual}</strong></div>
          </aside>
          <div className="case-narrative">
            <section><p className="eyebrow">01 / THE PROBLEM</p><h2>Designed around the investigation.</h2><p>{project.problem}</p></section>
            <section><p className="eyebrow">02 / SYSTEM SHAPE</p><h2>Architecture that can be checked.</h2><div className="architecture-grid">{project.architecture.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
            <section><p className="eyebrow">03 / EVIDENCE</p><h2>What the public record supports.</h2><ul className="case-evidence">{project.evidence.map(item => <li key={item}>{item}</li>)}</ul>{project.repository && <a className="section-evidence" href={project.repository}>EXPLORE THE REPOSITORY <span aria-hidden="true">↗</span></a>}</section>
            <section className="case-boundary"><p className="eyebrow">HONEST BOUNDARY</p><p>{project.boundary}</p></section>
          </div>
        </div>
        <nav className="next-case" aria-label="Next case study"><span>NEXT SYSTEM</span><Link href={`/projects/${next.slug}`}>{next.name} <span aria-hidden="true">→</span></Link></nav>
      </article>
    </InnerShell>
  );
}
