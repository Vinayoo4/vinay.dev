import { NextResponse } from "next/server";
import certifications from "@/data/certifications.json";

export async function GET() {
  return NextResponse.json(certifications);
}
