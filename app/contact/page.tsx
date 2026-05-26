"use client";

import { useState } from "react";
import { tenants } from "@/lib/tenants";

const mvpTenants = tenants.filter((tenant) => tenant.status === "mvp");

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    ventureSpecific: false,
    tenantId: mvpTenants[0]?.id || "portfolio",
  });
  const [status, setStatus] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("Sending...");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setStatus("Message saved in JSON store.");
      setForm({ name: "", email: "", subject: "", message: "", ventureSpecific: false, tenantId: mvpTenants[0]?.id || "portfolio" });
    } else {
      setStatus("Could not submit message.");
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <section>
        <p className="eyebrow">Contact & Support</p>
        <h1>Talk to the SALTED HASH team</h1>
      </section>

      <form onSubmit={submit} className="card grid gap-4">
        <input required placeholder="Name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="field" />
        <input required type="email" placeholder="Email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="field" />
        <input required placeholder="Subject" value={form.subject} onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))} className="field" />
        <textarea required rows={6} placeholder="Message" value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} className="field" />

        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.ventureSpecific}
            onChange={(event) => setForm((prev) => ({ ...prev, ventureSpecific: event.target.checked }))}
          />
          This is about a specific venture
        </label>

        {form.ventureSpecific && (
          <select value={form.tenantId} onChange={(event) => setForm((prev) => ({ ...prev, tenantId: event.target.value }))} className="field">
            {mvpTenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>{tenant.name}</option>
            ))}
          </select>
        )}

        <button className="btn btn-primary w-fit" type="submit">Send message</button>
        {status && <p className="text-sm text-[#233CB5]">{status}</p>}
      </form>
    </div>
  );
}
