import { tenants } from "@/lib/tenants";

export function createSaltReply(message: string, pathName: string) {
  const text = message.toLowerCase();
  const currentTenant = tenants.find((tenant) => pathName.includes(`/venture/${tenant.id}`));

  if (text.includes("resume") || text.includes("ats")) {
    return {
      text: "Great move. Start with ATS Resume Checker, add skill keywords from your target role, and keep each project outcome measurable.",
      actions: ["Open ATS Checker", "Go to Solutions"],
    };
  }

  if (text.includes("exam") || text.includes("study")) {
    return {
      text: "Let us keep it light and focused. Try the Exam Prep Preview and I will suggest a short micro-study plan from your quiz result.",
      actions: ["Open Exam Prep", "Go to School Projects"],
    };
  }

  if (text.includes("gst") || text.includes("hsn")) {
    return {
      text: "Share your product wording clearly. I will map it to practical GST/HSN hints with a gentle compliance reminder.",
      actions: ["Open GST Helper", "Go to Studio"],
    };
  }

  const contextual = currentTenant
    ? `You are exploring ${currentTenant.name}.`
    : `You are exploring SALTED HASH.`;

  return {
    text: `${contextual} I am Salt—your calm guide. I can help you pick a venture, use a mini tool, and turn activity into quick insights without forms.`,
    actions: ["Open ATS Checker", "Open Studio", "Open Solutions"],
  };
}

export function summarizeInteractions(interactions: Array<{ type: string; path?: string; tenantId?: string; action?: string; question?: string }>) {
  const seenPaths = Array.from(new Set(interactions.filter((x) => x.type === "page_view" && x.path).map((x) => x.path)));
  const usedTools = Array.from(new Set(interactions.filter((x) => x.type === "tool_usage" && x.tenantId).map((x) => x.tenantId)));
  const asked = interactions.filter((x) => x.type === "chat" && x.question).length;

  const pagePart = seenPaths.length ? `Visited ${seenPaths.slice(0, 3).join(", ")}` : "Visited limited pages";
  const toolPart = usedTools.length ? `used ${usedTools.join(", ")}` : "did not use tools yet";
  const chatPart = asked ? `and asked Salt ${asked} question${asked > 1 ? "s" : ""}` : "and did not open chat";

  return `${pagePart}, ${toolPart}, ${chatPart}.`;
}
