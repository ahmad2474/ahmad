import { ProfileChat } from "./profile-chat";
import { AgentSigil } from "./sculpture-diagram";

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
              <AgentSigil />
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
