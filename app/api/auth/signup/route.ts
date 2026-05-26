import { NextRequest, NextResponse } from "next/server";
import { hashPassword, signToken } from "@/lib/auth";
import { appendJsonArrayItem, isoNow, safeId } from "@/lib/jsonStore";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, tenants = [] } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = {
      id: safeId("user"),
      email,
      passwordHash,
      createdAt: isoNow(),
      tenants,
      profile: {
        name: name || "",
        role: role || "visitor",
      },
    };

    await appendJsonArrayItem("users/users.json", user);

    const token = signToken({ userId: user.id, email: user.email });
    const authSession = {
      sessionId: safeId("sess"),
      userId: user.id,
      token,
      createdAt: isoNow(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    await appendJsonArrayItem("sessions/auth-sessions.json", authSession);

    return NextResponse.json({ user: { ...user, passwordHash: undefined }, token });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
