import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, signToken } from "@/lib/auth";
import { appendJsonArrayItem, isoNow, readJsonFile, safeId } from "@/lib/jsonStore";

interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  tenants: string[];
  profile: {
    name: string;
    role: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const users = await readJsonFile<StoredUser[]>("users/users.json", []);
    const user = users.find((entry) => entry.email.toLowerCase() === String(email).toLowerCase());

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ userId: user.id, email: user.email });
    const authSession = {
      sessionId: safeId("sess"),
      userId: user.id,
      token,
      createdAt: isoNow(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };

    await appendJsonArrayItem("sessions/auth-sessions.json", authSession);

    return NextResponse.json({
      token,
      session: authSession,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        tenants: user.tenants,
        profile: user.profile,
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
