"use client";

import { useRef, useState } from "react";
import { EvidenceSculpture, InsightRibbon } from "./sculpture-diagram";
import { OPSPILOT_NODES } from "@/lib/portfolio-forms";

const projects = [
  { key: "opspilot", name: "OpsPilot AI", category: "AWS / AGENTIC OPERATIONS", status: "SOURCE AVAILABLE", headline: "Investigate the cloud. Keep the evidence.", copy: "A read-only AWS investigation system for idle resources, cost context, and visible tool-based reasoning. One shared service layer connects the API, agent, and MCP tools.", stack: "FastAPI · AWS · Agents SDK · MCP · Terraform", evidence: ["Read-only resource investigation", "Tool traces + moto-based evaluations", "Provider fallback + investigation recall"], href: "https://github.com/ahmad2474/opspilot-ai", visual: "RESOURCE INVESTIGATION / SHARED SERVICES" },
  { key: "insightloop", name: "InsightLoop", category: "DATA / AGENTIC ANALYTICS", status: "SOURCE AVAILABLE", headline: "A question. A query. A trace you can follow.", copy: "A custom agent loop investigates a synthetic e-commerce warehouse in BigQuery. It plans, calls guarded SQL tools, observes results, retries errors, and asks for clarification.", stack: "Next.js · TypeScript · BigQuery · Gemini · Groq", evidence: ["Custom plan / tool / observe loop", "Read-only SQL guard + bounded queries", "Visible reasoning and query results"], href: "https://github.com/ahmad2474/insightloop", visual: "QUERY / OBSERVE / CLARIFY" },
  { key: "cloudops", name: "CloudOps Knowledge Assistant", category: "CONTEXT / OPERATIONS INTELLIGENCE", status: "IN DEVELOPMENT", headline: "Operations knowledge. With an evidence trail.", copy: "A production-grade RAG system in development for cloud and DevOps knowledge. The planned design combines hybrid retrieval, reranking, search-time authorization, grounded answers, and an evidence-review console.", stack: "FastAPI · OpenSearch · Bedrock · Next.js · Terraform", evidence: ["Planned: Titan V2 + BM25 + Cohere reranking", "Planned: ACLs, citations, abstention + Review Bench", "Planned: 222 public + 115 synthetic internal docs; 315 evaluation questions"], href: null, visual: "PLANNED: RETRIEVE / AUTHORIZE / GROUND / REVIEW" },
] as const;

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
      <div className="projects-heading"><p className="eyebrow section-index"><span />05 / SELECTED WORK</p><h2 id="projects-title" className="section-title">Selected <span>systems.</span></h2><p className="section-intro">Explore the work behind the capabilities.</p></div>
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
          <div className="project-tabs" role="tablist" aria-label="Highlighted projects" aria-orientation="vertical">{projects.map((item, index) => <button key={item.key} ref={element => { buttons.current[index] = element; }} type="button" role="tab" id={`tab-${item.key}`} aria-controls="project-panel" aria-selected={index === selected} tabIndex={index === selected ? 0 : -1} onClick={() => choose(index)} onKeyDown={event => {
            if (["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (index + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : 2)) % 3; choose(next, true); }
          }}><span className="project-tab-index">0{index + 1}</span><span>{item.name}</span><span className="project-tab-arrow" aria-hidden="true">↗</span></button>)}</div>
          <article id="project-panel" className="project-panel" role="tabpanel" aria-labelledby={`tab-${project.key}`} tabIndex={0}>
            <div className="project-meta"><span className="eyebrow">{project.category}</span><span className="project-status">{project.status}</span></div>
            <h3>{project.headline}</h3><p>{project.copy}</p><ul className="project-evidence">{project.evidence.map(item => <li key={item}>{item}</li>)}</ul><p className="project-stack">{project.stack}</p>
            {project.href ? <a className="section-evidence" href={project.href}>EXPLORE THE REPOSITORY <span aria-hidden="true">↗</span></a> : <p className="project-pending">Implementation and evaluation are ongoing. Performance, cost, and deployment results will be published after measurement.</p>}
          </article>
        </div>
      </div>
    </section>
  );
}
