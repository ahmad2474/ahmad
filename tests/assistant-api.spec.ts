import { test, expect } from "@playwright/test";
import { GET, POST } from "../src/app/api/ahmad/route";
import { OFF_TOPIC } from "../src/lib/portfolio-knowledge";

test("off-topic requests skip providers; semantic off-topic output is normalized and résumé facts are supplied", async () => {
  const oldFetch = globalThis.fetch, oldGroq = process.env.GROQ_API_KEY, oldGemini = process.env.GEMINI_API_KEY;
  let calls = 0;
  process.env.GROQ_API_KEY = "test-key"; delete process.env.GEMINI_API_KEY;
  globalThis.fetch = async (_input, init) => {
    calls++;
    const system = JSON.parse(String(init?.body)).messages[0].content;
    for (const fact of ["Algoustics", "Onstak", "Ontrak", "Sikandar", "Digital Marketing", "Business Communication", "six years", "June 2026"]) expect(system).toContain(fact);
    expect(system).not.toMatch(/Validation Number:|Certification ID:/);
    const question = JSON.parse(String(init?.body)).messages.at(-1).content;
    return Response.json({ choices: [{ message: { content: JSON.stringify({ scope: question.includes("French") ? "unknown" : "off-topic", answer: "An invented claim or unrelated lecture.", sources: [] }) } }] });
  };
  const ask = (question: string) => POST(new Request("http://portfolio.test/api/ahmad", { method: "POST", headers: { "Content-Type": "application/json", "x-forwarded-for": "scope-test" }, body: JSON.stringify({ question, history: [{ role: "user", content: "Tell me about his AWS skills" }] }) }));
  try {
    expect((await (await ask("What is the capital of France?")).json()).answer).toBe(OFF_TOPIC);
    expect(calls).toBe(0);
    expect((await (await ask("Can Ahmad give me an astronomy lecture?")).json()).answer).toBe(OFF_TOPIC);
    expect(calls).toBe(1);
    const missing = await (await ask("Does Ahmad speak French?")).json();
    expect(missing.answer).toContain("don’t have verified information");
    expect(missing.answer).not.toContain("invented claim");
  } finally {
    globalThis.fetch = oldFetch;
    if (oldGroq === undefined) delete process.env.GROQ_API_KEY; else process.env.GROQ_API_KEY = oldGroq;
    if (oldGemini === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = oldGemini;
  }
});

test("server-only Groq failure falls back to Gemini, and invalid source IDs fall back to profile references", async () => {
  const originalFetch = globalThis.fetch;
  const oldGroq = process.env.GROQ_API_KEY, oldGemini = process.env.GEMINI_API_KEY;
  const calls: string[] = [];
  let invalid = false;
  process.env.GROQ_API_KEY = "test-groq-key";
  process.env.GEMINI_API_KEY = "test-gemini-key";
  globalThis.fetch = async (input, init) => {
    const url = String(input); calls.push(url);
    expect(JSON.stringify(init?.body)).not.toContain("test-groq-key");
    if (url.includes("api.groq.com")) return new Response("", { status: 429 });
    const body = JSON.parse(String(init?.body));
    expect(body.systemInstruction.parts[0].text).toContain("CloudOps is IN DEVELOPMENT");
    expect(body.contents.at(-1).parts[0].text).toBe("What is CloudOps?");
    return Response.json({ candidates: [{ content: { parts: [{ text: JSON.stringify({ scope: "profile", answer: "CloudOps is in development; its architecture and evaluation counts describe planned scope.", sources: [invalid ? "invented-private-source" : "cloudops"] }) }] } }] });
  };
  try {
    expect((await (await GET()).json()).mode).toBe("ai");
    const request = () => new Request("http://portfolio.test/api/ahmad", { method: "POST", headers: { "Content-Type": "application/json", origin: "http://portfolio.test", host: "portfolio.test" }, body: JSON.stringify({ question: "What is CloudOps?" }) });
    const first = await (await POST(request())).json();
    expect(first.mode).toBe("ai");
    expect(first.sources).toEqual([{ id: "cloudops", title: "CloudOps planned scope", href: "#projects" }]);
    expect(calls).toHaveLength(2);
    invalid = true;
    const second = await (await POST(request())).json();
    expect(second.mode).toBe("profile");
    expect(second.notice).toContain("temporarily unavailable");
    expect(second.answer).toContain("IN DEVELOPMENT");
    expect(JSON.stringify(second)).not.toContain("test-gemini-key");
  } finally {
    globalThis.fetch = originalFetch;
    if (oldGroq === undefined) delete process.env.GROQ_API_KEY; else process.env.GROQ_API_KEY = oldGroq;
    if (oldGemini === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = oldGemini;
  }
});
