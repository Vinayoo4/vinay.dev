import { NextRequest, NextResponse } from "next/server";
import { isoNow, safeId, writeJsonFile } from "@/lib/jsonStore";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, tenantId, ventureSpecific } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const entry = {
      id: safeId("contact"),
      name,
      email,
      subject,
      message,
      tenantId: ventureSpecific ? tenantId || null : null,
      createdAt: isoNow(),
    };

    await writeJsonFile(`contact/contact-${Date.now()}.json`, entry);
    return NextResponse.json({ success: true, entry });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
