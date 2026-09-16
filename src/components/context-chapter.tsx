const layers = [
  { name: "RETRIEVE", title: "Find the relevant context.", copy: "Dense and keyword search bring different signals. Reranking and parent context help bring the useful evidence forward." },
  { name: "AUTHORIZE", title: "Respect the boundary.", copy: "Filter by role at search time. Evidence outside a user's permissions should never reach the model." },
  { name: "GROUND", title: "Let evidence lead.", copy: "Validate citations against retrieved sources. When evidence is missing or conflicting, make that uncertainty explicit." },
] as const;

export function ContextChapter() {
  return (
    <section className="context-chapter" id="context" aria-labelledby="context-title">
      <div className="context-stage">
        <div className="context-heading">
          <p className="eyebrow chapter-index"><span />03 / CONTEXT & RAG</p>
          <h2 id="context-title">Context.<br /><span>Before confidence.</span></h2>
          <p className="chapter-lead">An answer is only as useful<br />as the evidence behind it.</p>
          <p className="context-intro">Connecting operations knowledge to an agent means finding the right source, respecting access, and keeping the answer accountable.</p>
          <a className="context-trace-link" href="#context-pipeline">FOLLOW THE EVIDENCE <span aria-hidden="true">↓</span></a>
        </div>
        <figure className="context-field" aria-labelledby="context-caption">
          <div className="context-particle-anchor">
          <div className="context-aura" aria-hidden="true" />
          <svg className="context-diagram" viewBox="0 0 1000 1000" aria-hidden="true">
            <defs><linearGradient id="context-line"><stop stopColor="#b7a1f4" /><stop offset="1" stopColor="#d4bdff" /></linearGradient></defs>
            {[2, 1, 0].map(layer => <g key={layer} className={`context-page context-page-${layer}`} transform={`translate(${layer * 95} ${-layer * 75}) rotate(-9 450 530)`}>
              <path className="context-page-edge" d="M 195 300 H 550 L 655 405 V 800 H 195 Z M 550 300 V 405 H 655" />
              <g className="context-static-points">{Array.from({ length: 11 }, (_, row) => <path key={row} d={`M 235 ${440 + row * 26} H ${row % 3 === 0 ? 505 : 605}`} />)}</g>
              <path className="context-page-line" d="M 235 360 H 455 M 235 388 H 395 M 235 750 H 330" />
            </g>)}
            <path className="context-connection" d="M 90 890 C 280 920 480 885 700 790 S 940 530 895 250" pathLength="100" />
            <path className="context-trace" d="M 90 890 C 280 920 480 885 700 790 S 940 530 895 250" pathLength="100" />
          </svg>
          </div>
          <div className="context-field-label source-label"><span className="eyebrow">SOURCE CONTEXT</span><span>Docs. Runbooks. Incidents.</span></div>
          <div className="context-field-label evidence-label"><span className="eyebrow">GROUNDED ANSWER</span><span>Traceable to its source.</span></div>
          <figcaption id="context-caption" className="sr-only">A conceptual evidence flow: retrieve source documents, authorize access, and ground an answer in citations. This is not a live retrieval run.</figcaption>
        </figure>
      </div>
      <ol className="context-pipeline" id="context-pipeline" aria-label="Evidence flow">
        {layers.map((layer, i) => <li key={layer.name} className="context-step"><div className="context-step-index"><span>0{i + 1}</span><span className="eyebrow">{layer.name}</span><span className="context-step-arrow" aria-hidden="true">↗</span></div><h3>{layer.title}</h3><p>{layer.copy}</p></li>)}
      </ol>
    </section>
  );
}
