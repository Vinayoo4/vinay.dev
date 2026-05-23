import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import chatData from "@/data/chat.json";

const chatPath = path.join(process.cwd(), "data", "chat.json");

export async function GET() {
  return NextResponse.json(chatData);
}

export async function POST(req: NextRequest) {
  try {
    const { room, user, message } = await req.json();
    if (!room || !user || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const currentData = JSON.parse(fs.readFileSync(chatPath, "utf-8"));
    const newMsg = {
      id: Date.now().toString(),
      room,
      user,
      message,
      timestamp: new Date().toISOString(),
    };
    currentData.messages.push(newMsg);

    const roomData = currentData.autoReplies[room] || currentData.autoReplies["general"];
    let autoReply = null;
    const lower = message.toLowerCase();
    for (const rule of roomData) {
      const triggers = rule.trigger.split("|");
      if (triggers.some((t: string) => lower.includes(t))) {
        autoReply = {
          id: (Date.now() + 1).toString(),
          room,
          user: "SaltedHash AI",
          message: rule.response,
          timestamp: new Date().toISOString(),
        };
        currentData.messages.push(autoReply);
        break;
      }
    }

    fs.writeFileSync(chatPath, JSON.stringify(currentData, null, 2));
    return NextResponse.json({ success: true, message: newMsg, autoReply });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
