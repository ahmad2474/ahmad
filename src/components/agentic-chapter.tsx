import { NETWORK_NODES, NETWORK_ROUTES, NETWORK_SPOKES } from "@/lib/agentic-network";

const phases = [
  { name: "Reason", label: "Intent", title: "Give intelligence a direction.", copy: "Break a goal into steps. Choose the next tool. Keep each decision connected to the task.", note: "Intent → a deliberate plan" },
  { name: "Act", label: "Plan", title: "Connect thought to tools.", copy: "Turn the plan into explicit tool calls. Work within defined boundaries, and keep the execution visible.", note: "Plan → a bounded action" },
  { name: "Verify", label: "Evidence", title: "Make the result accountable.", copy: "Inspect the evidence. Check assumptions. Keep a trace of how the system arrived at its answer.", note: "Evidence → a checked result" },
] as const;

export function AgenticChapter() {
  return (
    <section className="agentic-chapter" aria-labelledby="agentic-title">
      <div className="agentic-stage" id="agentic-ai" tabIndex={-1}>
        <div className="agentic-overview">
        <div className="chapter-heading">
          <p className="eyebrow chapter-index"><span /> 02 / AGENTIC AI</p>
          <h2 id="agentic-title">From intent.<br /><span>To impact.</span></h2>
          <p className="chapter-lead">Intelligence becomes useful<br />when it knows how to act.</p>
          <p className="chapter-intro">I build agents around deliberate decisions, bounded tools, and visible evidence. Each action belongs to a loop that can be understood, inspected, and improved.</p>
          <a className="context-trace-link" href="#agent-loop-cards">EXPLORE THE LOOP <span aria-hidden="true">↓</span></a>
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
        <div className="chapter-process" id="agent-loop-cards">
          <nav className="agentic-phase-nav" aria-label="Explore the agent loop">
            {phases.map((phase, i) => <a key={phase.name} href={`#agent-${phase.name.toLowerCase()}`} data-phase-link={i}><span>0{i + 1}</span>{phase.name}<span className="phase-line" aria-hidden="true" /></a>)}
          </nav>
          <div className="phase-stories">
            {phases.map((phase, i) => <article key={phase.name} id={`agent-${phase.name.toLowerCase()}`} className="phase-story" data-phase-story={i} tabIndex={-1}>
              <div className="phase-card-top"><span className="eyebrow">{phase.label}</span><span aria-hidden="true">0{i + 1} / {phase.name.toUpperCase()}</span></div>
              <h3>{phase.title}</h3><p>{phase.copy}</p><p className="phase-note">{phase.note}</p>
            </article>)}
          </div>
        </div>
        <div className="chapter-evidence"><span className="eyebrow">EXPLORE THE WORK</span><a href="https://github.com/ahmad2474/opspilot-ai">OpsPilot AI <span aria-hidden="true">↗</span></a><a href="https://github.com/ahmad2474/insightloop">InsightLoop <span aria-hidden="true">↗</span></a></div>
        <div className="chapter-baseline"><span>REASON <span>→</span> ACT <span>→</span> VERIFY</span><span className="chapter-scroll-hint">SCROLL TO TRACE THE LOOP <span>↓</span></span></div>
      </div>
    </section>
  );
}
