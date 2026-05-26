"use client";

import { useMemo, useState } from "react";
import { founderProfile, schoolGuides, examQuestions } from "@/lib/ventureContent";

type Tenant = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: "mvp" | "future";
};

function getSessionId() {
  if (typeof window === "undefined") return "anonymous";
  const existing = localStorage.getItem("salt_session_id");
  if (existing) return existing;
  const generated = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem("salt_session_id", generated);
  return generated;
}

async function trackTool(tenantId: string, action: string, inputSummary: string) {
  const sessionId = getSessionId();
  await fetch("/api/salt/telemetry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      tenantId,
      event: {
        type: "tool_usage",
        tenantId,
        action,
        inputSummary,
        time: new Date().toISOString(),
      },
    }),
  }).catch(() => undefined);
}

export function VentureClient({ tenant }: { tenant: Tenant }) {
  if (tenant.status !== "mvp") {
    return <p className="rounded-2xl bg-white p-6 text-[#233CB5]">This venture is planned as a future release.</p>;
  }

  if (tenant.id === "portfolio") return <PortfolioVenture />;
  if (tenant.id === "ats-resume") return <AtsVenture />;
  if (tenant.id === "exam-prep") return <ExamVenture />;
  if (tenant.id === "school-projects") return <SchoolProjectsVenture />;
  if (tenant.id === "gst-helper") return <GstVenture />;

  return <p>No mini interaction configured yet.</p>;
}

function PortfolioVenture() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Portfolio inquiry", message: "", ventureSpecific: true, tenantId: "portfolio" });
  const [status, setStatus] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setStatus("Saved to JSON inbox.");
      setForm({ name: "", email: "", subject: "Portfolio inquiry", message: "", ventureSpecific: true, tenantId: "portfolio" });
      await trackTool("portfolio", "contact_submit", "portfolio contact form submitted");
    } else {
      setStatus("Submission failed.");
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6">
        <h2 className="text-xl font-semibold text-[#233CB5]">Founder Snapshot</h2>
        <p className="mt-2 text-sm text-slate-700">{founderProfile.summary}</p>
        <p className="mt-2 text-sm text-slate-700">{founderProfile.name} · {founderProfile.role} · {founderProfile.location}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {founderProfile.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-[#F1ACC6]/40 px-3 py-1 text-sm text-[#233CB5]">{skill}</span>
          ))}
        </div>
        <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-slate-700">
          {founderProfile.projects.map((project) => (
            <li key={project.title}><strong>{project.title}</strong> — {project.impact}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl bg-white p-6">
        <h3 className="text-lg font-semibold text-[#233CB5]">Contact this venture</h3>
        <form onSubmit={submit} className="mt-4 grid gap-3">
          <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required placeholder="Name" className="rounded-xl border px-3 py-2" />
          <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} required type="email" placeholder="Email" className="rounded-xl border px-3 py-2" />
          <input value={form.subject} onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))} required placeholder="Subject" className="rounded-xl border px-3 py-2" />
          <textarea value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} required placeholder="Message" rows={4} className="rounded-xl border px-3 py-2" />
          <button className="rounded-xl bg-[#E26912] px-4 py-2 font-medium text-white">Submit</button>
        </form>
        {status && <p className="mt-3 text-sm text-[#233CB5]">{status}</p>}
      </section>
    </div>
  );
}

function AtsVenture() {
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState<any>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/tools/ats-resume/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: getSessionId(), resumeText }),
    });

    const payload = await response.json();
    if (response.ok) {
      setResult(payload.result);
      await trackTool("ats-resume", "check_resume", `Resume text length ~${resumeText.split(/\s+/).filter(Boolean).length} words`);
    }
  };

  return (
    <section className="rounded-2xl bg-white p-6">
      <form onSubmit={submit} className="space-y-3">
        <textarea value={resumeText} onChange={(event) => setResumeText(event.target.value)} required rows={8} placeholder="Paste resume text" className="w-full rounded-xl border px-3 py-2" />
        <button className="rounded-xl bg-[#233CB5] px-4 py-2 font-medium text-white">Check Resume</button>
      </form>
      {result && (
        <div className="mt-4 rounded-xl bg-[#F1ACC6]/30 p-4 text-sm text-slate-700">
          <p><strong>Score:</strong> {result.score}/100</p>
          <p><strong>Matched keywords:</strong> {result.matchedKeywords.join(", ") || "None"}</p>
          <ul className="mt-2 list-disc pl-6">
            {result.suggestions.map((tip: string) => <li key={tip}>{tip}</li>)}
          </ul>
        </div>
      )}
    </section>
  );
}

function ExamVenture() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/tools/exam-prep/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: getSessionId(), answers }),
    });

    const payload = await response.json();
    if (response.ok) {
      setResult(payload.result);
      await trackTool("exam-prep", "submit_quiz", `Answered ${Object.keys(answers).length} quiz items`);
    }
  };

  return (
    <section className="rounded-2xl bg-white p-6">
      <form onSubmit={submit} className="space-y-5">
        {examQuestions.map((question) => (
          <fieldset key={question.id} className="space-y-2">
            <legend className="font-medium text-[#233CB5]">{question.question}</legend>
            {question.options.map((option) => (
              <label key={option.value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={answers[question.id] === option.value}
                  onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: option.value }))}
                />
                {option.label}
              </label>
            ))}
          </fieldset>
        ))}
        <button className="rounded-xl bg-[#233CB5] px-4 py-2 font-medium text-white">Evaluate Quiz</button>
      </form>
      {result && (
        <div className="mt-4 rounded-xl bg-[#EEF0DA] p-4 text-sm">
          <p><strong>Score:</strong> {result.score}/{result.total} ({result.percentage}%)</p>
          <ul className="mt-2 list-disc pl-6">
            {result.microPlan.map((item: string) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      )}
    </section>
  );
}

function SchoolProjectsVenture() {
  const [seen, setSeen] = useState<string[]>([]);

  const markSeen = async (title: string) => {
    if (seen.includes(title)) return;
    setSeen((prev) => [...prev, title]);
    await trackTool("school-projects", "view_project", `Viewed guide: ${title}`);
  };

  return (
    <section className="rounded-2xl bg-white p-6">
      <div className="space-y-4">
        {schoolGuides.map((guide) => (
          <article key={guide.title} className="rounded-xl border p-4">
            <p className="text-xs uppercase tracking-wide text-[#909648]">{guide.class} · {guide.subject}</p>
            <h3 className="mt-1 font-semibold text-[#233CB5]">{guide.title}</h3>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
              {guide.steps.map((step) => <li key={step}>{step}</li>)}
            </ul>
            <button type="button" onClick={() => markSeen(guide.title)} className="mt-3 rounded-lg bg-[#F1ACC6]/50 px-3 py-1.5 text-sm text-[#233CB5]">
              {seen.includes(guide.title) ? "Viewed" : "Mark as viewed"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function GstVenture() {
  const [productDescription, setProductDescription] = useState("");
  const [result, setResult] = useState<any>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/tools/gst-helper/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: getSessionId(), productDescription }),
    });

    const payload = await response.json();
    if (response.ok) {
      setResult(payload.result);
      await trackTool("gst-helper", "classify_product", `GST query length ${productDescription.length} chars`);
    }
  };

  return (
    <section className="rounded-2xl bg-white p-6">
      <form onSubmit={submit} className="space-y-3">
        <textarea value={productDescription} onChange={(event) => setProductDescription(event.target.value)} required rows={5} placeholder="Describe your product" className="w-full rounded-xl border px-3 py-2" />
        <button className="rounded-xl bg-[#233CB5] px-4 py-2 font-medium text-white">Get GST/HSN Hint</button>
      </form>
      {result && (
        <div className="mt-4 rounded-xl bg-[#EEF0DA] p-4 text-sm">
          <p><strong>HSN:</strong> {result.suggestion.hsn}</p>
          <p><strong>GST:</strong> {result.suggestion.gst}</p>
          <p><strong>Hint:</strong> {result.suggestion.hint}</p>
          <p className="mt-2 text-xs text-slate-600">{result.disclaimer}</p>
        </div>
      )}
    </section>
  );
}
