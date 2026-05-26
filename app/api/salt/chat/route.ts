import { NextRequest, NextResponse } from "next/server";
import { appendJsonArrayItem, isoNow, safeId } from "@/lib/jsonStore";
import { createSaltReply } from "@/lib/salt";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, text, path = "/", channel = "web" } = await request.json();

    if (!sessionId || !text) {
      return NextResponse.json({ error: "sessionId and text are required" }, { status: 400 });
    }

    const reply = createSaltReply(String(text), String(path));
    const userMessage = {
      id: safeId("msg"),
      sessionId,
      channel,
      from: "user",
      text,
      time: isoNow(),
    };

    const saltMessage = {
      id: safeId("msg"),
      sessionId,
      channel,
      from: "salt",
      text: reply.text,
      actions: reply.actions,
      time: isoNow(),
    };

    await appendJsonArrayItem(`chats/chat-${sessionId}.json`, userMessage);
    await appendJsonArrayItem(`chats/chat-${sessionId}.json`, saltMessage);

    return NextResponse.json({ message: saltMessage });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
