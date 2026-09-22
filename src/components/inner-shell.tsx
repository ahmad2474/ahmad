import Link from "next/link";
import { CopyrightYear } from "./copyright-year";
import { FreshHomeLink } from "./fresh-home-link";
import { MobileNavigation } from "./mobile-navigation";

const Arrow = () => <span className="arrow" aria-hidden="true">↗</span>;

export function InnerHeader() {
  return (
    <header className="site-header inner-header">
      <FreshHomeLink className="wordmark" href="/" aria-label="Ahmad Hassan, home">AHMAD HASSAN</FreshHomeLink>
      <nav className="desktop-navigation" aria-label="Main navigation">
        <FreshHomeLink className="nav-link" href="/">Home</FreshHomeLink>
        <Link className="nav-link" href="/projects">Projects</Link>
        <Link className="nav-link" href="/blog">Journal</Link>
        <FreshHomeLink className="nav-link" href="/#contact">Contact</FreshHomeLink>
      </nav>
      <MobileNavigation />
      <a className="header-link" href="https://github.com/ahmad2474">GitHub <Arrow /></a>
    </header>
  );
}

export function InnerFooter() {
  return (
    <footer className="site-footer inner-footer">
      <div className="footer-identity"><p>Ahmad Hassan</p><p className="footer-copyright">© <CopyrightYear initialYear={new Date().getFullYear()} /> All rights reserved.</p></div>
      <span className="footer-center" aria-hidden="true">IDENTITY <span>|</span> INTELLIGENCE <span>|</span> INFRASTRUCTURE</span>
      <a href="mailto:ahmad_warraich@outlook.com">Let’s build something intelligent. <Arrow /></a>
    </footer>
  );
}

export function InnerShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="portfolio inner-portfolio">
      <div className="inner-atmosphere" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
      <InnerHeader />
      <main id="main" tabIndex={-1}>{children}</main>
      <InnerFooter />
    </div>
  );
}
