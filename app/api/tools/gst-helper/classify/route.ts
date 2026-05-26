import { NextRequest, NextResponse } from "next/server";
import { appendJsonArrayItem, isoNow, safeId } from "@/lib/jsonStore";

const hintRules = [
  { trigger: ["software", "app", "saas"], hsn: "9983", gst: "18%", hint: "Digital services commonly align with service classifications." },
  { trigger: ["cloth", "garment", "shirt"], hsn: "61/62", gst: "5-12%", hint: "Garments vary by value and product type." },
  { trigger: ["snack", "food", "packaged"], hsn: "2106", gst: "5-12%", hint: "Packaged food rates depend on preparation and branding." },
];

export async function POST(request: NextRequest) {
  try {
    const { sessionId = "anonymous", productDescription = "" } = await request.json();

    if (!productDescription.trim()) {
      return NextResponse.json({ error: "productDescription is required" }, { status: 400 });
    }

    const text = productDescription.toLowerCase();
    const matchedRule = hintRules.find((rule) => rule.trigger.some((token) => text.includes(token)));

    const result = {
      id: safeId("gst"),
      sessionId,
      tenantId: "gst-helper",
      input: productDescription,
      suggestion: matchedRule
        ? {
            hsn: matchedRule.hsn,
            gst: matchedRule.gst,
            hint: matchedRule.hint,
          }
        : {
            hsn: "Needs manual classification",
            gst: "Depends on specific category",
            hint: "Please validate with a qualified tax professional.",
          },
      disclaimer: "Guidance only. This is not legal or tax advice.",
      createdAt: isoNow(),
    };

    await appendJsonArrayItem("tools/gst-helper-results.json", result);

    return NextResponse.json({ result });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
