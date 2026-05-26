import { NextRequest, NextResponse } from "next/server";
import { appendJsonArrayItem, isoNow, safeId } from "@/lib/jsonStore";

const answerKey: Record<string, string> = {
  q1: "b",
  q2: "c",
  q3: "a",
};

export async function POST(request: NextRequest) {
  try {
    const { sessionId = "anonymous", answers = {} } = await request.json();

    const score = Object.keys(answerKey).reduce((acc, questionId) => {
      return acc + (String(answers[questionId] || "").toLowerCase() === answerKey[questionId] ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / Object.keys(answerKey).length) * 100);
    const microPlan =
      percentage >= 80
        ? ["Do a 15-minute revision sprint daily.", "Practice one mixed set every 2 days."]
        : ["Revise weak chapter concepts for 20 minutes.", "Solve 5 practice questions and review mistakes."];

    const result = {
      id: safeId("quiz"),
      sessionId,
      tenantId: "exam-prep",
      answers,
      score,
      total: Object.keys(answerKey).length,
      percentage,
      microPlan,
      createdAt: isoNow(),
    };

    await appendJsonArrayItem("tools/exam-prep-results.json", result);

    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
