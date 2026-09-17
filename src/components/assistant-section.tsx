import { ProfileChat } from "./profile-chat";

export function AssistantSection() {
  return (
    <section id="ahmad-ai" className="narrative-section assistant-section" aria-labelledby="assistant-title" tabIndex={-1}>
      <div className="section-grid assistant-grid">
        <div className="assistant-identity">
          <p className="eyebrow section-index"><span />02 / MEET AHMAD.AI</p>
          <h2 id="assistant-title" className="section-title">A little more<br /><span>human context.</span></h2>
          <figure className="agent-symbol" aria-labelledby="agent-symbol-caption">
            <div className="visual-aura" aria-hidden="true" />
            <svg className="agent-symbol-diagram visual-diagram" viewBox="0 0 1000 1000" aria-hidden="true">
              <g className="form-fallback"><ellipse cx="500" cy="500" rx="360" ry="300" /><rect x="245" y="300" width="510" height="380" rx="95" /><rect x="263" y="316" width="474" height="348" rx="88" /><ellipse cx="400" cy="460" rx="27" ry="44" /><ellipse cx="600" cy="460" rx="27" ry="44" /><path d="M430 590H570M500 290V190" /><circle cx="500" cy="180" r="14" /></g>
              <path className="visual-guide" d="M160 500H210M790 500H840" />
            </svg>
            <figcaption id="agent-symbol-caption"><span>AHMAD.AI</span><span>YOUR GUIDE TO THE ENGINEER.</span></figcaption>
          </figure>
        </div>
        <ProfileChat />
      </div>
      <noscript><p className="no-script-note">Enable JavaScript to ask a question, or <a href="mailto:ahmad_warraich@outlook.com">email Ahmad directly</a>.</p></noscript>
    </section>
  );
}
