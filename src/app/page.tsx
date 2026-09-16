import { IdentityField } from "@/components/identity-field";
import { AgenticScene } from "@/components/agentic-scene";
import { AgenticChapter } from "@/components/agentic-chapter";
import { ContextChapter } from "@/components/context-chapter";
import { CloudOpsChapter } from "@/components/cloudops-chapter";

function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <><AgenticScene /><div className="portfolio" id="identity">
      <header className="site-header">
        <a className="wordmark" href="#identity" aria-label="Ahmad Hassan, home">AHMAD HASSAN</a>
        <nav aria-label="Main navigation">
          <a className="nav-link" href="#identity">Identity</a>
          <a className="nav-link" href="#agentic-ai">Work</a>
        </nav>
        <a className="header-link" href="https://github.com/ahmad2474">GitHub <Arrow /></a>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="environment" aria-hidden="true">
            <div className="environment-light" />
            <div className="environment-grid" />
            <div className="environment-horizon" />
            <div className="environment-floor" />
          </div>
          <div className="scene-index eyebrow" aria-hidden="true"><span className="index-rule" /><span>01 / THE ENGINEER</span></div>
          <div className="hero-copy">
            <p className="identity-kicker eyebrow">INTELLIGENCE MEETS INFRASTRUCTURE</p>
            <h1 id="hero-title"><span>AHMAD</span><span>HASSAN<span className="name-period">.</span></span></h1>
            <p className="role">AGENTIC AI DEVELOPER<br /><span className="role-cross">×</span> DEVOPS ENGINEER</p>
            <p className="hero-headline">I build agents that act.<br />Infrastructure that scales.</p>
          </div>
          <IdentityField />
          <div className="hero-actions">
            <a className="button-primary" href="https://wa.me/923026849341" target="_blank" rel="noopener noreferrer">Chat on WhatsApp <Arrow /><span className="sr-only"> (opens in a new tab)</span></a>
            <a className="button-secondary" href="mailto:ahmad_warraich@outlook.com">Get in touch <Arrow /></a>
          </div>
          <aside className="engineering-notes" aria-labelledby="notes-title">
            <p className="eyebrow notes-intro">HUMAN AT THE CORE.<br />SYSTEMS AROUND IT.</p>
            <h2 id="notes-title">Intelligence,<br /><span>engineered.</span></h2>
            <dl className="disciplines">
              <div><dt><span aria-hidden="true">01</span> AGENTIC AI</dt><dd>Reason. Verify. Act.</dd></div>
              <div><dt><span aria-hidden="true">02</span> CONTEXT & RAG</dt><dd>Grounded in evidence.</dd></div>
              <div><dt><span aria-hidden="true">03</span> INFRASTRUCTURE</dt><dd>Built to operate.</dd></div>
            </dl>
            <p className="notes-signoff">From the next action<br />to the system around it.</p>
          </aside>
          <div className="hero-closing"><a className="scroll-cue" href="#agentic-ai"><span aria-hidden="true">↓</span> SCROLL TO EXPLORE</a></div>
        </section>
        <AgenticChapter />
        <ContextChapter />
        <CloudOpsChapter />
      </main>
      <footer className="site-footer">
        <p>AH / PORTFOLIO V2</p>
        <span className="footer-center" aria-hidden="true">IDENTITY <span>—</span> INTELLIGENCE <span>—</span> INFRASTRUCTURE</span>
        <a href="mailto:ahmad_warraich@outlook.com">Let’s build something intelligent. <Arrow /></a>
      </footer>
    </div></>
  );
}
