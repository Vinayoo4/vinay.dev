import { NextResponse } from "next/server";
import { tenants } from "@/lib/tenants";

export async function GET(_: Request, { params }: { params: { tenantId: string } }) {
  const tenant = tenants.find((item) => item.id === params.tenantId);
  if (!tenant) {
    return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
  }

  return NextResponse.json({ tenant });
}
