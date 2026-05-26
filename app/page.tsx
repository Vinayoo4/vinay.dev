import Link from "next/link";
import { tenants } from "@/lib/tenants";

const mvpTenants = tenants.filter((tenant) => tenant.status === "mvp");

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="hero">
        <p className="eyebrow">SALTED HASH · Venture Studio + Product Lab</p>
        <h1>Problem-first digital products, built with wisdom and precision.</h1>
        <p>
          SALTED HASH ships practical mini tools across education, finance, SME ops, and career growth—while Salt quietly turns user journeys into actionable insight.
        </p>
        <div className="cta-row">
          <Link href="/studio" className="btn btn-primary">Explore Ventures</Link>
          <Link href="/venture/ats-resume" className="btn btn-secondary">Try a Mini Tool</Link>
        </div>
      </section>

      <section>
        <h2>Featured Ventures</h2>
        <div className="card-grid">
          {mvpTenants.map((tenant) => (
            <article key={tenant.id} className="card">
              <span className="badge live">Live</span>
              <h3>{tenant.name}</h3>
              <p>{tenant.description}</p>
              <Link href={`/venture/${tenant.id}`} className="text-link">Open mini interaction</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="split">
        <article className="card">
          <h2>Problem-first Philosophy</h2>
          <p>
            We simplify complex workflows through disciplined thinking, strategic systems design, and a service mindset. Every release is built to be practical first, scalable next.
          </p>
        </article>

        <article className="card">
          <h2>Meet Salt</h2>
          <p>
            Salt is your always-on guide. It understands what you explore, helps you navigate quickly, and creates session insights automatically—no long forms required.
          </p>
        </article>
      </section>
    </div>
  );
}
