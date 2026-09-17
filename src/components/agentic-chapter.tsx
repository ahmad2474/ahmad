import { NETWORK_NODES, NETWORK_ROUTES, NETWORK_SPOKES } from "@/lib/agentic-network";

const phases = [
  { name: "Reason", copy: "Turn a goal into a plan. Choose the next tool deliberately." },
  { name: "Act", copy: "Use bounded tools and explicit calls. Keep execution visible." },
  { name: "Verify", copy: "Check evidence and assumptions. Preserve a trace of the result." },
] as const;

export function AgenticChapter() {
  return (
    <section className="agentic-chapter narrative-section" id="agentic-ai" aria-labelledby="agentic-title" tabIndex={-1}>
      <div className="agentic-stage">
        <div className="agentic-overview">
        <div className="chapter-heading">
          <p className="eyebrow section-index"><span />04 / AGENTIC AI ENGINEERING</p>
          <h2 id="agentic-title" className="section-title">From intent.<br /><span>To impact.</span></h2>
          <p className="section-intro">I build agents that connect decisions to tools, and answers to evidence. Useful intelligence should be inspectable.</p>
          <dl className="capability-lines">
            {phases.map((phase, i) => <div key={phase.name} id={`agent-${phase.name.toLowerCase()}`} data-phase-story={i} tabIndex={-1}><dt><a href={`#agent-${phase.name.toLowerCase()}`} data-phase-link={i}><span>0{i + 1}</span>{phase.name}<span aria-hidden="true">↗</span></a></dt><dd>{phase.copy}</dd></div>)}
          </dl>
          <p className="agent-grounding">Retrieval, permissions, and grounded answers belong to the same loop. CloudOps brings them together in its planned RAG design.</p>
          <a className="section-evidence" href="#projects">EXPLORE THE SYSTEMS <span aria-hidden="true">↓</span></a>
        </div>
        <figure className="agentic-network" aria-labelledby="network-caption">
          <div className="network-aura" aria-hidden="true" />
          <svg className="network-diagram" viewBox="0 0 1000 1000" aria-hidden="true">
            <defs>
              <radialGradient id="agent-core"><stop stopColor="#bea0ff" stopOpacity=".2" /><stop offset="1" stopColor="#917bdf" stopOpacity="0" /></radialGradient>
              <linearGradient id="agent-route"><stop stopColor="#91d8ff" /><stop offset="1" stopColor="#bd9aff" /></linearGradient>
            </defs>
            <circle cx="500" cy="460" r="215" fill="url(#agent-core)" />
            <g className="network-static-cloud">
              {[160, 180, 195].map(radius => <ellipse key={radius} cx="500" cy="460" rx={radius} ry={radius * .55} transform={`rotate(${radius * 2} 500 460)`} />)}
              <circle cx="500" cy="460" r="195" />
            </g>
            {NETWORK_SPOKES.map((p, i) => <path key={`spoke-${i}`} className="network-spoke" d={`M ${p[0] * 1000} ${p[1] * 1000} C ${p[2] * 1000} ${p[3] * 1000}, ${p[4] * 1000} ${p[5] * 1000}, ${p[6] * 1000} ${p[7] * 1000}`} />)}
            {NETWORK_ROUTES.map((p, i) => {
              const d = `M ${p[0] * 1000} ${p[1] * 1000} C ${p[2] * 1000} ${p[3] * 1000}, ${p[4] * 1000} ${p[5] * 1000}, ${p[6] * 1000} ${p[7] * 1000}`;
              return <g key={i}><path className="network-route" d={d} /><path className={`network-signal signal-${i}`} d={d} pathLength="100" /></g>;
            })}
            {NETWORK_NODES.map((node, i) => <g key={node.label} className={`network-node node-${i}`}><circle cx={node.x * 1000} cy={node.y * 1000} r="63" /><circle className="node-inner" cx={node.x * 1000} cy={node.y * 1000} r="46" /></g>)}
          </svg>
          <div className="network-core-label" aria-hidden="true"><span>AGENT</span><span>ORCHESTRATION</span></div>
          {NETWORK_NODES.map((node, i) => <div key={node.label} className={`network-label network-label-${i}`} style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }} aria-hidden="true"><span className="node-number">0{i + 1}</span><span>{node.label}</span><small>{node.detail}</small></div>)}
          <figcaption id="network-caption" className="sr-only">An agent coordinates a loop: reason about the goal, act through tools, then verify the returned evidence.</figcaption>
        </figure>
        </div>
      </div>
    </section>
  );
}
