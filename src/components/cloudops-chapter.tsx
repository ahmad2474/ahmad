import { CLOUDOPS_ROUTES, CLOUDOPS_NODES } from "@/lib/cloudops-particles";

const capabilities = [
  { label: "Retrieval", title: "Hybrid signals. Richer context.", copy: "The planned pipeline combines Titan V2 dense search and BM25, RRF / weighted fusion, and Cohere Rerank 3.5. Parent/child expansion restores context; heading, table, and code-aware chunking plus content hashes support incremental indexing.", note: "Search → rerank → expand" },
  { label: "Trust", title: "Permissions before prompts.", copy: "Role-based ACLs filter OpenSearch results before evidence reaches the model. Citation validation, abstention, and source-conflict detection ground the answer. Adversarial tests target cross-role leakage and prompt injection.", note: "Authorize → cite → verify" },
  { label: "Operations", title: "A system you can inspect.", copy: "FastAPI is planned with request IDs, structured logs, provider timeouts / retries, token-bucket limits, SSE, readiness, and query-cost accounting. The Review Bench will connect answer/evidence review, retrieval trails, incidents, and evaluations.", note: "Trace → review → evaluate" },
] as const;

export function CloudOpsChapter() {
  return (
    <section className="cloudops-chapter" id="cloudops" aria-labelledby="cloudops-title">
      <div className="cloudops-overview">
        <div className="cloudops-heading">
          <p className="eyebrow chapter-index"><span />PROJECT / OPERATIONS INTELLIGENCE</p>
          <span className="project-status">IN DEVELOPMENT</span>
          <h2 id="cloudops-title">CloudOps<br /><span>Knowledge<br />Assistant.</span></h2>
          <p className="chapter-lead">Operations knowledge.<br />With an evidence trail.</p>
          <p className="chapter-intro">I’m building a production-grade RAG system for cloud and DevOps operations, bringing retrieval, permissions, and grounded answers into one reviewable workflow.</p>
          <ul className="cloudops-stack" aria-label="Planned technology stack"><li>FastAPI</li><li>OpenSearch</li><li>Amazon Bedrock</li><li>Next.js</li><li>Terraform</li></ul>
        </div>
        <figure className="cloudops-field" aria-labelledby="cloudops-caption">
          <div className="cloudops-particle-anchor">
            <div className="network-aura" aria-hidden="true" />
            <svg className="cloudops-diagram" viewBox="0 0 1000 1000" aria-hidden="true">
              <defs><linearGradient id="cloudops-route"><stop stopColor="#ae8aef" /><stop offset="1" stopColor="#e0cdff" /></linearGradient></defs>
              <g className="cloudops-lattice">{[340, 460, 580].map(y => <path key={y} d={`M 300 ${y} L 500 ${y - 80} L 700 ${y} L 500 ${y + 80} Z${y < 580 ? ` M 300 ${y} V ${y + 120} M 700 ${y} V ${y + 120}` : ""}`} />)}</g>
              <g className="cloudops-static-cloud">{[120, 145, 175].map(radius => <ellipse key={radius} cx="500" cy="460" rx={radius} ry={radius * 1.3} />)}</g>
              {CLOUDOPS_ROUTES.map((route, i) => {
                const d = `M ${route[0] * 1000} ${route[1] * 1000} C ${route[2] * 1000} ${route[3] * 1000} ${route[4] * 1000} ${route[5] * 1000} ${route[6] * 1000} ${route[7] * 1000}`;
                return <g key={i}><path className="cloudops-route" d={d} /><path className="cloudops-signal" d={d} pathLength="100" /></g>;
              })}
              {CLOUDOPS_NODES.map(node => <circle key={node.label} className="cloudops-node" cx={node.x * 1000} cy={node.y * 1000} r="35" />)}
            </svg>
            <div className="cloudops-core" aria-hidden="true"><span>EVIDENCE</span><span>ENGINE</span></div>
          </div>
          <ul className="cloudops-node-labels" aria-label="Planned architecture flow">{CLOUDOPS_NODES.map((node, i) => <li key={node.label} className={`cloudops-label cloudops-label-${i}`} style={{ left: `${node.x * 100}%`, top: `${node.y * 100}%` }}><span className="eyebrow">0{i + 1} / {node.label}</span><span>{node.detail}</span></li>)}</ul>
          <figcaption id="cloudops-caption">PLANNED ARCHITECTURE <span>|</span> RETRIEVE / AUTHORIZE / GROUND / REVIEW</figcaption>
        </figure>
      </div>
      <div className="cloudops-capabilities">{capabilities.map((capability, i) => <article key={capability.label} className="cloudops-capability"><div className="phase-card-top"><span className="eyebrow">{capability.label}</span><span>0{i + 1}</span></div><h3>{capability.title}</h3><p>{capability.copy}</p><p className="phase-note">{capability.note}</p></article>)}</div>
      <div className="cloudops-data">
        <p className="eyebrow">PLANNED KNOWLEDGE & EVALUATION</p>
        <dl><div><dt>222<span>DOCUMENTS</span></dt><dd>Public AWS, Kubernetes<br />and Terraform knowledge.</dd></div><div><dt>115<span>INTERNAL DOCUMENTS</span></dt><dd>Synthetic knowledge base.<br />70 incident post-mortems.</dd></div><div><dt>315<span>EVALUATION QUESTIONS</span></dt><dd>10 categories, comparing retrieval<br />and answer-grounding stages.</dd></div></dl>
      </div>
      <div className="cloudops-foundation">
        <article><p className="eyebrow">DELIVERY / TERRAFORM ON AWS</p><h3>Designed to run.<br />Designed to observe.</h3><p>The intended AWS demo uses a VPC without NAT, EC2, managed OpenSearch, ECR, least-privilege IAM, and CloudWatch alarms. Deployment, teardown, and load testing remain part of the development plan.</p></article>
        <article><p className="eyebrow">EVALUATION / RESULTS PENDING</p><h3>Measure the system.<br />Before making the claim.</h3><p>Planned checks cover retrieval quality, faithfulness, citation validity, abstention, authorization safety, latency, and cost. The corpus and evaluation counts describe the intended scope; measured results will follow completed runs.</p></article>
      </div>
    </section>
  );
}
