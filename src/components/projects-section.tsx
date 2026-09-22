"use client";

import { useRef, useState } from "react";
import { EvidenceSculpture, InsightRibbon } from "./sculpture-diagram";
import { OPSPILOT_NODES } from "@/lib/portfolio-forms";
import { PROJECTS as projects } from "@/lib/projects";
import Link from "next/link";

export function ProjectsSection() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const project = projects[selected];
  const choose = (index: number, focus = false) => {
    setSelected(index);
    window.dispatchEvent(new CustomEvent("portfolio-project", { detail: projects[index].key }));
    if (focus) buttons.current[index]?.focus();
  };
  return (
    <section id="projects" className="narrative-section projects-section" aria-labelledby="projects-title" tabIndex={-1} data-project={project.key}>
      <div className="projects-heading"><p className="eyebrow section-index"><span />05 / SELECTED WORK</p><h2 id="projects-title" className="section-title">Selected <span>systems.</span></h2><p className="section-intro">Explore AI agents, RAG systems and AWS cloud tooling.</p></div>
      <div className="section-grid project-grid">
        <figure className="project-field" aria-labelledby="project-visual-caption">
          <div className="project-particle-anchor visual-anchor"><div className="visual-aura" aria-hidden="true" />
            <svg className="project-diagram visual-diagram" viewBox="0 0 1000 1000" aria-hidden="true">
              {project.key === "opspilot" ? <><g className="form-fallback"><circle cx="500" cy="500" r="100" /><circle cx="500" cy="500" r="310" /><circle cx="500" cy="500" r="390" />{OPSPILOT_NODES.map((node, i) => <circle key={i} cx={node.x * 1000} cy={node.y * 1000} r="35" />)}</g><g className="visual-guide">{OPSPILOT_NODES.map((node, i) => <path key={i} d={`M500 500L${node.x * 1000} ${node.y * 1000}`} />)}</g></> : project.key === "insightloop" ? <InsightRibbon /> : <EvidenceSculpture />}
            </svg>
            <span className="project-visual-index" aria-hidden="true">0{selected + 1}<span>/ 03</span></span>
          </div>
          <figcaption id="project-visual-caption" className="visual-caption">{project.visual}<small>CONCEPTUAL ARCHITECTURE STUDY.</small></figcaption>
        </figure>
        <div className="project-content">
          <div className="project-tabs" role="tablist" aria-label="Highlighted projects" aria-orientation="vertical">{projects.map((item, index) => <button key={item.key} ref={element => { buttons.current[index] = element; }} type="button" role="tab" id={`tab-${item.key}`} aria-controls={`project-panel-${item.key}`} aria-selected={index === selected} tabIndex={index === selected ? 0 : -1} onClick={() => choose(index)} onKeyDown={event => {
            if (["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (index + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : 2)) % 3; choose(next, true); }
          }}><span className="project-tab-index">0{index + 1}</span><span>{item.name}</span><span className="project-tab-arrow" aria-hidden="true">↗</span></button>)}</div>
          {projects.map((item, index) => (
          <article key={item.key} id={`project-panel-${item.key}`} hidden={index !== selected} className="project-panel" role="tabpanel" aria-labelledby={`tab-${item.key}`} tabIndex={0}>
            <div className="project-meta"><span className="eyebrow">{item.category}</span><span className="project-status">{item.status}</span></div>
            <h3>{item.headline}</h3><p>{item.summary}</p><ul className="project-evidence">{item.evidence.map(evidence => <li key={evidence}>{evidence}</li>)}</ul><p className="project-stack">{item.stack.join(" · ")}</p>
            <div className="project-actions"><Link className="section-evidence" href={`/projects/${item.slug}`}>VIEW CASE STUDY <span aria-hidden="true">↗</span></Link>{item.repository && <a className="section-evidence" href={item.repository}>REPOSITORY <span aria-hidden="true">↗</span></a>}</div>
            {item.key === "cloudops" && <p className="project-pending">Live provider evaluation and the AWS demo are pending. Performance, cost and deployment results will follow measurement.</p>}
          </article>
          ))}
        </div>
      </div>
    </section>
  );
}
