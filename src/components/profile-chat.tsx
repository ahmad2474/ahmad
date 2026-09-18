"use client";

import { useEffect, useRef, useState } from "react";
import type { ProfileAnswer } from "@/lib/portfolio-knowledge";

type Message = { role: "user" | "assistant"; content: string; result?: ProfileAnswer };
const prompts = ["What does Ahmad build?", "Tell me about OpsPilot AI", "What is CloudOps?"];

export function ProfileChat() {
  const [mode, setMode] = useState<"loading" | "profile" | "ai" | "offline">("loading");
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const request = useRef<AbortController | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const alive = useRef(true);
  const pending = useRef(false);

  useEffect(() => {
    alive.current = true;
    const controller = new AbortController();
    fetch("/api/ahmad", { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error("Unavailable"); return response.json();
    }).then(data => { if (alive.current) setMode(data.mode === "ai" ? "ai" : "profile"); }).catch(() => { if (alive.current && !controller.signal.aborted) setMode("offline"); });
    return () => { alive.current = false; controller.abort(); request.current?.abort(); };
  }, []);

  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, busy, error]);

  const send = async (text: string) => {
    const value = text.trim();
    if (!value || value.length > 600 || pending.current) return;
    pending.current = true; setBusy(true); setError(""); setQuestion("");
    const previous = messages.slice(-6);
    setMessages(current => [...current.slice(-18), { role: "user", content: value }]);
    const controller = new AbortController(); request.current = controller;
    try {
      const response = await fetch("/api/ahmad", { method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.any([controller.signal, AbortSignal.timeout(25_000)]), body: JSON.stringify({ question: value, history: previous.map(({ role, content }) => ({ role, content: content.slice(0, 1200) })) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The answer couldn’t load. Try again.");
      if (typeof data.answer !== "string" || !Array.isArray(data.sources)) throw new Error("The answer couldn’t load. Try again.");
      if (alive.current) setMessages(current => [...current, { role: "assistant", content: data.answer, result: data }]);
    } catch (failure) {
      if (alive.current && !controller.signal.aborted) { setError(failure instanceof Error && failure.name !== "TimeoutError" ? failure.message : "The answer took too long. Please try again."); setQuestion(value); }
    } finally { pending.current = false; if (alive.current) setBusy(false); }
  };

  return (
    <div className="profile-chat">
      <div className="chat-topline"><span className="eyebrow">A CONVERSATION, WITH CONTEXT.</span><span className="chat-mode">{mode === "ai" ? "AI enabled" : mode === "loading" ? "Connecting…" : mode === "offline" ? "Connection unavailable" : "Profile references"}</span></div>
      <div className="chat-log" ref={log} role="log" aria-label="Conversation with Ahmad.AI" aria-live="polite" aria-relevant="additions" tabIndex={0}>
        {!messages.length && <div className="chat-welcome"><span className="chat-spark" aria-hidden="true">✦</span><h3>Get to know the engineer.</h3><p>Ask about Ahmad’s skills, experience, projects or how to reach him.</p><span className="chat-reference-note">Answers grounded in Ahmad’s supplied résumé and project references.</span></div>}
        {messages.map((message, index) => <article key={index} className={`chat-message chat-${message.role}`}><span className="eyebrow">{message.role === "user" ? "YOU" : "AHMAD.AI"}{message.result?.mode === "profile" && " / PROFILE ANSWER"}</span><p>{message.content}</p>{message.result?.notice && <p className="chat-notice">{message.result.notice}</p>}{message.result && message.result.sources.length > 0 && <div className="chat-sources" aria-label="Answer references">{message.result.sources.map(source => <a key={source.id} href={source.href}>{source.title} <span aria-hidden="true">↗</span></a>)}</div>}</article>)}
        {busy && <p className="chat-pending" role="status">Finding an answer…</p>}
      </div>
      <div className="chat-prompts" aria-label="Suggested questions">{prompts.map(prompt => <button key={prompt} type="button" disabled={busy} onClick={() => { void send(prompt); }}>{prompt}<span aria-hidden="true">↗</span></button>)}</div>
      {error && <p className="chat-error" role="alert">{error}</p>}
      <form className="chat-form" onSubmit={event => { event.preventDefault(); void send(question); }}>
        <label className="sr-only" htmlFor="ahmad-question">Ask about Ahmad</label>
        <textarea ref={input} id="ahmad-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={600} rows={2} placeholder="What would you like to know?" disabled={busy} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void send(question); } }} />
        <button type="submit" disabled={busy || !question.trim()} aria-label="Send question"><span aria-hidden="true">↗</span></button>
      </form>
      <p className="chat-privacy">{mode === "ai" ? "Messages are sent to an AI provider. Avoid sharing private information." : "Profile answers are available now. Free-form AI will connect when configured."} This site doesn’t save conversations.</p>
    </div>
  );
}
