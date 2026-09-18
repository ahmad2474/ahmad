import { CLOUDOPS_ROUTES, EVIDENCE_PAGES } from "@/lib/cloudops-particles";

export function AgentSigil() {
  return <g className="form-fallback"><path d="M500 110C500 390 610 500 870 500C610 500 500 610 500 890C500 610 390 500 130 500C390 500 500 390 500 110Z" /><path d="M500 205C500 415 585 500 780 500C585 500 500 585 500 795C500 585 415 500 220 500C415 500 500 415 500 205Z" /><ellipse cx="500" cy="500" rx="420" ry="120" /><circle cx="500" cy="500" r="35" /></g>;
}

export function InsightRibbon() {
  return <g className="form-fallback">{[-.035, .035].map(width => <path key={width} d={Array.from({ length: 121 }, (_, i) => {
    const a = i / 120 * Math.PI * 2;
    return `${i ? "L" : "M"}${500 + (Math.sin(a) * .33 + width * Math.cos(a)) * 1000} ${500 - (Math.sin(a * 2) * .22 + width * Math.sin(a)) * 1000}`;
  }).join(" ") + "Z"} />)}</g>;
}

export function EvidenceSculpture() {
  return <><g className="form-fallback">{EVIDENCE_PAGES.map((page, i) => <g key={i} transform={`translate(${page.x * 1000} ${page.y * 1000}) rotate(${page.angle * 180 / Math.PI})`}><rect x="-85" y="-120" width="170" height="240" rx="8" />{[0, 1, 2, 3].map(line => <path key={line} d={`M-53 ${-52 + line * 35}H${line === 3 ? 12 : 53}`} />)}</g>)}<path d="M730 310 870 490 730 670 590 490ZM730 310V670M590 490H870" /></g><g className="visual-guide">{CLOUDOPS_ROUTES.map((p, i) => <path key={i} d={`M${p[0] * 1000} ${p[1] * 1000}C${p[2] * 1000} ${p[3] * 1000} ${p[4] * 1000} ${p[5] * 1000} ${p[6] * 1000} ${p[7] * 1000}`} />)}</g></>;
}
