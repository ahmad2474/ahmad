import type { PortfolioProject } from "@/lib/projects";

export function ProjectGlyph({ project }: { project: PortfolioProject }) {
  return (
    <div className={`project-glyph project-glyph-${project.key}`} aria-hidden="true">
      <span className="glyph-orbit glyph-orbit-a" /><span className="glyph-orbit glyph-orbit-b" />
      <span className="glyph-core" />
      {Array.from({ length: 6 }, (_, index) => <span className="glyph-node" key={index} />)}
      <span className="glyph-label">{project.number} / 03</span>
    </div>
  );
}
