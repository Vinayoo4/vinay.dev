import { NextResponse } from "next/server";
import services from "@/data/services.json";

export async function GET() {
  return NextResponse.json(services);
}
