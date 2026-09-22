import { INFRA_NODES } from "@/lib/portfolio-forms";

export function InfrastructureDiagram() {
  return <>
    <g className="visual-guide">{INFRA_NODES.map(node => <path key={node.label} d={`M500 500L${node.x * 1000} ${node.y * 1000}`} />)}</g>
    <g className="form-fallback"><ellipse cx="500" cy="500" rx="145" ry="102" /><ellipse cx="500" cy="500" rx="105" ry="145" />{INFRA_NODES.map(node => <g key={node.label}><circle cx={node.x * 1000} cy={node.y * 1000} r="64" /><circle cx={node.x * 1000} cy={node.y * 1000} r="47" /></g>)}</g>
  </>;
}

export function InfrastructureSection() {
  return (
    <section id="infrastructure" className="narrative-section infrastructure-section" aria-labelledby="infrastructure-title" tabIndex={-1}>
      <div className="section-grid">
        <div className="section-copy">
          <p className="eyebrow section-index"><span />03 / DEVOPS & INFRASTRUCTURE</p>
          <h2 id="infrastructure-title" className="section-title">Intelligence needs<br /><span>infrastructure.</span></h2>
          <p className="section-intro">The agent is only one part of the system. I build the boundaries, delivery paths, and visibility around it.</p>
          <dl className="capability-lines">
            <div><dt><span>01</span> Provision deliberately.</dt><dd>Terraform-backed AWS resources, with infrastructure defined alongside the application.</dd></div>
            <div><dt><span>02</span> Make delivery repeatable.</dt><dd>Containerized backends and CI checks for lint, tests, and builds.</dd></div>
            <div><dt><span>03</span> Keep operations inspectable.</dt><dd>Read-only access boundaries, request traces, and audit trails.</dd></div>
          </dl>
          <a className="section-evidence" href="https://github.com/ahmad2474/opspilot-ai">SEE THE ENGINEERING IN OPSPILOT <span aria-hidden="true">↗</span></a>
        </div>
        <figure className="infrastructure-field" aria-labelledby="infra-caption">
          <div className="infrastructure-anchor visual-anchor">
            <div className="visual-aura" aria-hidden="true" />
            <svg className="visual-diagram" viewBox="0 0 1000 1000" aria-hidden="true"><InfrastructureDiagram /></svg>
            <span className="visual-center-label" aria-hidden="true">SYSTEM<br /><small>CONNECTED BY DESIGN</small></span>
          </div>
          <div className="infra-labels" aria-hidden="true">{INFRA_NODES.map((node, i) => <div key={node.label} className={`infra-label infra-label-${i}`} style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }}><span>{node.label}</span><small>{node.detail}</small></div>)}</div>
          <figcaption id="infra-caption" className="visual-caption">A CONCEPTUAL TOPOLOGY | PROVISION / DEPLOY / OPERATE</figcaption>
        </figure>
      </div>
    </section>
  );
}
