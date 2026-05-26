import { notFound } from "next/navigation";
import { tenants } from "@/lib/tenants";
import { VentureClient } from "@/components/VentureClient";

export default function VenturePage({ params }: { params: { tenantId: string } }) {
  const tenant = tenants.find((entry) => entry.id === params.tenantId);

  if (!tenant) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-16">
      <section>
        <p className="eyebrow">Venture</p>
        <h1>{tenant.name}</h1>
        <p>{tenant.description}</p>
      </section>
      <VentureClient tenant={tenant} />
    </div>
  );
}
