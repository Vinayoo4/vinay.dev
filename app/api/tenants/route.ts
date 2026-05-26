import { NextResponse } from "next/server";
import { tenants } from "@/lib/tenants";

export async function GET() {
  return NextResponse.json({ tenants });
}
