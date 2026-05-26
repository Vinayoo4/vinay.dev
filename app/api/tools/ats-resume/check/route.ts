import { NextRequest, NextResponse } from "next/server";
import { appendJsonArrayItem, isoNow, safeId } from "@/lib/jsonStore";

const coreKeywords = ["leadership", "project", "react", "next.js", "typescript", "analytics", "team", "impact"];

export async function POST(request: NextRequest) {
  try {
    const { sessionId = "anonymous", resumeText = "" } = await request.json();

    if (!resumeText.trim()) {
      return NextResponse.json({ error: "resumeText is required" }, { status: 400 });
    }

    const lower = String(resumeText).toLowerCase();
    const matchedKeywords = coreKeywords.filter((keyword) => lower.includes(keyword));
    const hasSections = ["experience", "education", "skills"].filter((section) => lower.includes(section));
    const score = Math.min(100, Math.round((matchedKeywords.length / coreKeywords.length) * 70 + hasSections.length * 10));

    const result = {
      id: safeId("ats"),
      sessionId,
      tenantId: "ats-resume",
      resumeLength: resumeText.split(/\s+/).filter(Boolean).length,
      score,
      matchedKeywords,
      suggestions: [
        matchedKeywords.length < 4 ? "Add more role-specific keywords aligned with the target job." : "Keyword coverage is decent; refine impact metrics.",
        hasSections.includes("experience") ? "Use measurable outcomes in each experience bullet." : "Add a clear Experience section.",
        hasSections.includes("skills") ? "Group technical skills by category for ATS readability." : "Include a dedicated Skills section.",
      ],
      createdAt: isoNow(),
    };

    await appendJsonArrayItem("tools/ats-resume-results.json", result);

    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
