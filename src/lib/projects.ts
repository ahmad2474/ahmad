export const PROJECTS = [
  {
    slug: "opspilot-ai",
    key: "opspilot",
    name: "OpsPilot AI",
    number: "01",
    category: "AWS / AGENTIC OPERATIONS",
    status: "SOURCE AVAILABLE",
    headline: "Investigate the cloud. Keep the evidence.",
    summary: "An AI agent for read-only AWS cost and idle-resource investigation, with visible tool-based reasoning. One shared service layer connects the API, agent, and MCP tools.",
    stack: ["FastAPI", "AWS", "OpenAI Agents SDK", "MCP", "Terraform"],
    evidence: ["Read-only resource investigation", "Tool traces and moto-based evaluations", "Provider fallback and investigation recall"],
    repository: "https://github.com/ahmad2474/opspilot-ai",
    visual: "RESOURCE INVESTIGATION / SHARED SERVICES",
    problem: "Cloud cost investigation often means moving between inventory, pricing and operational context before a useful answer appears. OpsPilot explores how an agent can coordinate that investigation while keeping its evidence visible.",
    architecture: [
      ["Bounded access", "AWS inspection tools operate within read-only IAM boundaries."],
      ["Shared services", "The API, agent and MCP interface reuse one service layer instead of duplicating cloud logic."],
      ["Inspectable output", "Tool calls and evidence remain visible so a recommendation can be checked."],
    ],
    boundary: "Repository review supports the architecture and evaluation tooling described here. This case study does not claim production adoption, savings, or an independently verified live AWS run.",
  },
  {
    slug: "insightloop",
    key: "insightloop",
    name: "InsightLoop",
    number: "02",
    category: "DATA / AGENTIC ANALYTICS",
    status: "SOURCE AVAILABLE",
    headline: "A question. A query. A trace you can follow.",
    summary: "An agentic data analyst investigates a synthetic e-commerce warehouse in BigQuery. Its custom loop plans, calls guarded SQL tools, observes results, retries errors, and asks for clarification.",
    stack: ["Next.js", "TypeScript", "BigQuery", "Gemini", "Groq"],
    evidence: ["Custom plan / tool / observe loop", "Read-only SQL guard and bounded queries", "Visible reasoning and query results"],
    repository: "https://github.com/ahmad2474/insightloop",
    visual: "QUERY / OBSERVE / CLARIFY",
    problem: "A useful data agent has to do more than produce SQL. It must interpret the question, operate within query boundaries, recover from errors and make the investigation understandable to the person asking.",
    architecture: [
      ["Plan", "The loop decides whether it has enough context to query or should ask for clarification."],
      ["Query safely", "Guarded, read-only BigQuery tools constrain the agent’s access and bound its work."],
      ["Observe and continue", "Results and failures return to the loop for explanation, correction or another bounded step."],
    ],
    boundary: "The public repository supports the custom loop and query guard described here. No production usage, business outcome, or independently verified BigQuery deployment is claimed.",
  },
  {
    slug: "cloudops-knowledge-assistant",
    key: "cloudops",
    name: "CloudOps Knowledge Assistant",
    number: "03",
    category: "CONTEXT / OPERATIONS INTELLIGENCE",
    status: "IN DEVELOPMENT",
    headline: "Operations knowledge. With an evidence trail.",
    summary: "A retrieval-augmented generation (RAG) system in development for cloud and DevOps knowledge. The planned design combines hybrid retrieval, reranking, search-time authorization, grounded answers, and an evidence-review console.",
    stack: ["FastAPI", "OpenSearch", "Amazon Bedrock", "Next.js", "Terraform"],
    evidence: ["Planned: Titan V2 + BM25 + Cohere reranking", "Planned: ACLs, citations, abstention and Review Bench", "Planned: 222 public + 115 synthetic internal documents; 315 evaluation questions"],
    repository: null,
    visual: "PLANNED: RETRIEVE / AUTHORIZE / GROUND / REVIEW",
    problem: "On-call engineers need answers that respect permissions, expose their sources and know when the available evidence is insufficient. The project is being designed around those operational constraints.",
    architecture: [
      ["Retrieve", "The planned pipeline combines dense and lexical search, fusion, reranking and parent context."],
      ["Authorize", "Role filters are intended to run in OpenSearch before any retrieved context reaches the model."],
      ["Ground and review", "Planned citation validation, abstention, conflict detection and Review Bench make answers inspectable."],
    ],
    boundary: "This is intended architecture, not a completed result. Retrieval scores, faithfulness, latency, cost, security-test results and deployment outcomes will only be published after measurement.",
  },
] as const;

export type PortfolioProject = (typeof PROJECTS)[number];

export function getProject(slug: string) {
  return PROJECTS.find(project => project.slug === slug);
}
