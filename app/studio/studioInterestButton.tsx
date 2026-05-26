"use client";

import { useState } from "react";

export function StudioInterestButton({ tenantId }: { tenantId: string }) {
  const [label, setLabel] = useState("Notify me later");

  return (
    <button
      type="button"
      className="text-link"
      onClick={async () => {
        const sessionId = localStorage.getItem("salt_session_id") || `sess_${Date.now()}`;
        localStorage.setItem("salt_session_id", sessionId);

        await fetch("/api/salt/telemetry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            tenantId,
            event: {
              type: "tool_usage",
              tenantId,
              action: "notify_interest",
              inputSummary: "Future venture interest captured",
              time: new Date().toISOString(),
            },
          }),
        }).catch(() => undefined);

        setLabel("Interest saved");
      }}
    >
      {label}
    </button>
  );
}
