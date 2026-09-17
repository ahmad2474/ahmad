# Portfolio V2 — Project evidence register

Status: supplied CV and selected public repository documentation/source inspected. Independent live operation and measured outcomes remain unverified.

## Compact revision evidence review

September 18: Ahmad reports the deployed assistant works. No further provider requests were needed for the atmosphere/control revision; separate Gemini fallback fidelity/connectivity remains unverified.

Final configuration checkpoint: a locally supplied Gemini key was moved to ignored local configuration. The user reports both keys added in Vercel and approved one local Gemini test. It returned the labeled provider-unavailable profile fallback; real model generation remains unconfirmed. This supersedes earlier key deferrals.

OpsPilot and InsightLoop now appear together in one selectable projects section. On September 17, read the public READMEs plus selected source: OpsPilot [Terraform tables](https://github.com/ahmad2474/opspilot-ai/blob/main/scripts/terraform/main.tf) and [CI workflow](https://github.com/ahmad2474/opspilot-ai/blob/main/.github/workflows/ci.yml); InsightLoop [agent loop](https://github.com/ahmad2474/insightloop/blob/main/src/lib/agent/loop.ts) and [query guard](https://github.com/ahmad2474/insightloop/blob/main/src/lib/bigquery/client.ts). Reviewed artifacts support table provisioning, backend Docker/CI, custom tool/retry/clarification flow and read-only SQL boundaries. Other descriptions are explicitly repository-documented. No end-to-end AWS/BigQuery run, evaluation result, deployment adoption or financial outcome was independently verified. In particular, OpsPilot Terraform provisions three DynamoDB tables, not an entire AWS platform.

CloudOps is an in-development project within the same selector. Its architecture, 222/115 document counts and 315-question evaluation scope remain planned; unknown result metrics stay omitted. No repository/demo URL is invented.

Ahmad.AI now precedes capabilities, per explicit user approval. Implemented a curated knowledge base and server route with Groq/Gemini failover, no external tools or stored conversations. Server-side keys are deferred by the user. Without keys, it serves visibly labeled profile-reference answers. Its process-local request limiter is best-effort; provider quotas/free-account settings and Vercel's platform protections govern public usage. Actual provider connectivity and answer-quality evaluation require keys and remain unverified.

## September 16 evidence intake

September 17: résumé text and first-page rendering rechecked through macOS PDFKit. The first Agentic AI chapter now links to the supplied OpsPilot AI / InsightLoop repositories and illustrates planning, bounded tool use and verification. It does not show a real run, assert new project outcomes or replace the pending repository evidence review.

The following are user-supplied CV assertions for later case-study research, not independently validated accomplishments:

- **OpsPilot AI:** autonomous AWS cost/idle-resource investigation; OpenAI Agents SDK, evidence traces, three-provider fallback, fixture evaluation using moto ground truth, shared logic/MCP, read-only IAM, 15 resource types and seven waste categories. Supplied repository: https://github.com/ahmad2474/opspilot-ai.
- **InsightLoop:** a custom agent loop for BigQuery with read-only safeguards, traces and multiple providers. Supplied repository: https://github.com/ahmad2474/insightloop.

The pending lists below still require repository inspection before public case-study writing.

## CloudOps Knowledge Assistant — in progress

Latest September 17 user request authorizes a fuller animated portfolio presentation. A procedural planned evidence-engine diagram and three capability panels now accompany the supplied design. Public corpus/evaluation counts (222, 115 with 70 incidents, 315 with 10 categories) are qualified as PLANNED KNOWLEDGE & EVALUATION. No metric or completion status is inferred from these planned counts. Evaluation and Terraform/AWS delivery copy stays future/intended tense; a measured case-study outcome remains pending.

September 17 next-part authorization: the portfolio now includes a conceptual RAG/context chapter and a clearly in-development CloudOps architecture note. Its source-document visual is procedural, not a product screenshot/live run. The public copy uses intended design language and omits all unknown metrics. This supersedes the earlier statement below that no RAG chapter is present; a completed case study and backend are still absent.

User explicitly described the intended end product. Do not convert the future-tense scope into completed work or ship résumé bullets with measurement placeholders.

Planned scope:
- FastAPI, OpenSearch, Amazon Bedrock, Next.js and Terraform; 222 public AWS/Kubernetes/Terraform documents plus a synthetic 115-document internal knowledge base including 70 incident post-mortems.
- Titan V2 dense retrieval + BM25, RRF/weighted fusion, Cohere Rerank 3.5 and parent/child context expansion; a 315-question, 10-category evaluation set.
- Search-time role ACL filters before LLM context; adversarial cross-role and prompt-injection testing.
- Citation validation, abstention on insufficient evidence and source-conflict detection.
- Request IDs, structured logs, timeouts/retries, token-bucket limits, SSE, readiness and request-cost accounting.
- Review Bench operations console for answer/evidence review, retrieval trails, incidents and evaluations.
- AWS Terraform demo with VPC without NAT, EC2, managed OpenSearch, ECR, least-privilege IAM and CloudWatch; $150 ceiling is a budget, not measured spend. Teardown and load testing are intended.
- Structure-aware chunking and content-hash incremental indexing.

Before publishing numbers, collect evidence from `evaluation/reports/`, `make aws-cost` and load-test outputs in that project's repository. Recall@5, MRR, NDCG, attack counts/pass rates, faithfulness, citation validity, abstention accuracy, dollars/query, deployment spend, p95 latency, RPS and embedding cost are currently unknown. Omit every unknown metric from public copy. This portfolio does not yet include a RAG case study or its backend.

## Case-study structure
For each project collect: problem and intended users; Ahmad's role and ownership; actual implementation status; architecture and data flow; stack and deployment; key engineering decisions; limitations; evaluation method; verified outcomes; repository/demo links; screenshots or diagrams and permission to publish them.

A proposed capability is not a shipped feature. Distinguish measured results from targets. Do not invent percentages, clients, traffic, reliability, repository URLs or production usage.

## OpsPilot
Narrative position: after Infrastructure/DevOps.
- Confirmed: project name and intended case-study placement.
- Pending: purpose, users, features, status, role, architecture, stack, operational evidence, results and links.
- Next step: inspect supplied source or documentation and interview the evidence before writing public claims. Do not infer features from the name.

## InsightLoop
Narrative position: after OpsPilot.
- Confirmed: project name and intended case-study placement.
- Pending: purpose, users, features, status, role, architecture, stack, evaluation, results and links.
- Next step: inspect supplied source or documentation before writing the case study. Do not infer features from the name.

## Ahmad.AI
Narrative position: after Engineering.
Historical context proposes evolving an existing portfolio assistant. No assistant code is present in the inspected folder, so reuse feasibility is unknown.
Before implementation define its knowledge sources, allowed actions, answer grounding, uncertainty behavior, privacy/data retention, abuse controls, latency/cost limits, and failure states. Keep credentials server-side. Do not describe planned integrations as operational.

## Earlier experience
WordPress may appear as supporting career context when verified. It must not displace Agentic AI and DevOps as the site's identity.

## Publishing readiness
Each case study needs a verified factual draft and working public links, or explicit omission of unavailable links. Confidential source, credentials and private data must remain outside published examples. Phase 01 may link only to real destinations; no pretend demos.

## Approved evidence directions from the implementation brief
OpsPilot AI is the primary case study; InsightLoop is secondary. The desired OpsPilot narrative is incident/problem → investigation → tool calls → evidence → hypothesis → verification → conclusion. Candidates to verify include read-only IAM boundaries, evaluation/hallucination testing, tool correctness, MCP/shared services, AWS investigation, FinOps and provider resilience. These are evidence requests, not confirmed features. Do not publish them as accomplishments until the actual project source or documentation supports them.
