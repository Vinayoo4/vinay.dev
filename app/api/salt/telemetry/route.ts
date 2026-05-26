import { NextRequest, NextResponse } from "next/server";
import { isoNow, readJsonFile, safeId, writeJsonFile } from "@/lib/jsonStore";
import { summarizeInteractions } from "@/lib/salt";

interface TelemetryInteraction {
  type: string;
  path?: string;
  tenantId?: string;
  action?: string;
  inputSummary?: string;
  question?: string;
  answerSummary?: string;
  time: string;
}

interface TelemetrySession {
  sessionId: string;
  deviceFingerprint: string;
  firstOpenTime: string;
  tenantId: string | null;
  interactions: TelemetryInteraction[];
  sessionSummary?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId = safeId("sess"),
      deviceFingerprint = "unknown-device",
      tenantId = null,
      event,
      finalize,
    } = body;

    if (!event || !event.type) {
      return NextResponse.json({ error: "event.type is required" }, { status: 400 });
    }

    const file = `sessions/session-${sessionId}.json`;
    const current = await readJsonFile<TelemetrySession | null>(file, null);

    const session: TelemetrySession = current || {
      sessionId,
      deviceFingerprint,
      firstOpenTime: isoNow(),
      tenantId,
      interactions: [],
    };

    session.interactions.push({ ...event, time: event.time || isoNow() });
    if (tenantId) session.tenantId = tenantId;

    if (finalize) {
      session.sessionSummary = summarizeInteractions(session.interactions);
    }

    await writeJsonFile(file, session);
    return NextResponse.json({ success: true, sessionId, sessionSummary: session.sessionSummary || null });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
