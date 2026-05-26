import Link from "next/link";
import { tenants } from "@/lib/tenants";
import { StudioInterestButton } from "./studioInterestButton";

const grouped = tenants.reduce<Record<string, typeof tenants>>((acc, tenant) => {
  acc[tenant.category] = acc[tenant.category] || [];
  acc[tenant.category].push(tenant);
  return acc;
}, {});

export default function StudioPage() {
  return (
    <div className="space-y-10 pb-16">
      <section>
        <p className="eyebrow">Studio / Ventures</p>
        <h1>Current and future ventures</h1>
      </section>

      {Object.entries(grouped).map(([category, entries]) => (
        <section key={category} className="space-y-4">
          <h2>{category}</h2>
          <div className="card-grid">
            {entries.map((tenant) => (
              <article key={tenant.id} className="card">
                <span className={`badge ${tenant.status === "mvp" ? "live" : "soon"}`}>
                  {tenant.status === "mvp" ? "Live" : "Coming soon"}
                </span>
                <h3>{tenant.name}</h3>
                <p>{tenant.description}</p>
                {tenant.status === "mvp" ? (
                  <Link href={`/venture/${tenant.id}`} className="text-link">Open mini interaction</Link>
                ) : (
                  <StudioInterestButton tenantId={tenant.id} />
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
