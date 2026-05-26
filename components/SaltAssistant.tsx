"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

interface ChatMessage {
  id: string;
  from: "user" | "salt";
  text: string;
  actions?: string[];
}

const actionRouteMap: Record<string, string> = {
  "Open ATS Checker": "/venture/ats-resume",
  "Go to Solutions": "/solutions",
  "Open Exam Prep": "/venture/exam-prep",
  "Go to School Projects": "/venture/school-projects",
  "Open GST Helper": "/venture/gst-helper",
  "Go to Studio": "/studio",
  "Open Studio": "/studio",
  "Open Solutions": "/solutions",
};

function getDeviceFingerprint() {
  if (typeof window === "undefined") return "unknown-device";
  return btoa(`${navigator.userAgent}|${window.screen.width}x${window.screen.height}`).slice(0, 48);
}

export function SaltAssistant() {
  const pathName = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "seed",
      from: "salt",
      text: "Hi, I am Salt. I can guide you across ventures and quietly summarize what you explore.",
      actions: ["Open Studio", "Open ATS Checker"],
    },
  ]);

  const tenantId = useMemo(() => {
    const parts = pathName.split("/").filter(Boolean);
    if (parts[0] === "venture" && parts[1]) return parts[1];
    return null;
  }, [pathName]);

  useEffect(() => {
    const existing = localStorage.getItem("salt_session_id");
    const next = existing || `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    if (!existing) localStorage.setItem("salt_session_id", next);
    setSessionId(next);
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    fetch("/api/salt/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        deviceFingerprint: getDeviceFingerprint(),
        tenantId,
        event: {
          type: "page_view",
          path: pathName,
          time: new Date().toISOString(),
        },
      }),
    }).catch(() => undefined);
  }, [pathName, sessionId, tenantId]);

  useEffect(() => {
    const handler = () => {
      if (!sessionId) return;
      navigator.sendBeacon(
        "/api/salt/telemetry",
        new Blob(
          [
            JSON.stringify({
              sessionId,
              deviceFingerprint: getDeviceFingerprint(),
              tenantId,
              event: { type: "session_end", path: pathName, time: new Date().toISOString() },
              finalize: true,
            }),
          ],
          { type: "application/json" },
        ),
      );
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [pathName, sessionId, tenantId]);

  const submit = async () => {
    if (!input.trim() || !sessionId) return;
    const userMessage: ChatMessage = {
      id: `u_${Date.now()}`,
      from: "user",
      text: input.trim(),
    };
    const text = input.trim();
    setMessages((current) => [...current, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/salt/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, path: pathName, text }),
      });
      const payload = await response.json();
      if (payload?.message) {
        setMessages((current) => [...current, payload.message]);
      }

      await fetch("/api/salt/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          deviceFingerprint: getDeviceFingerprint(),
          tenantId,
          event: {
            type: "chat",
            question: text,
            answerSummary: payload?.message?.text?.slice(0, 120) || "Salt response generated",
            time: new Date().toISOString(),
          },
        }),
      });
    } catch {
      setMessages((current) => [
        ...current,
        { id: `s_${Date.now()}`, from: "salt", text: "I missed that signal. Please try once more." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="h-14 w-14 rounded-full bg-[#233CB5] text-white shadow-lg shadow-[#233CB5]/40 hover:bg-[#1d318f]"
        aria-label="Open Salt assistant"
      >
        Salt
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            className="mt-3 w-[min(92vw,360px)] rounded-2xl border border-[#BF9113]/40 bg-white p-4 shadow-2xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-[#233CB5]">Salt Assistant</h3>
              <p className="text-xs text-[#909648]">watchman active</p>
            </div>

            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {messages.map((message) => (
                <div key={message.id} className={`rounded-xl p-2 text-sm ${message.from === "user" ? "bg-[#F1ACC6]/40" : "bg-[#EEF0DA]"}`}>
                  <p>{message.text}</p>
                  {message.actions && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.actions.map((action) => (
                        <button
                          key={`${message.id}-${action}`}
                          type="button"
                          onClick={() => {
                            const route = actionRouteMap[action];
                            if (route) router.push(route);
                          }}
                          className="rounded-lg border border-[#233CB5]/20 px-2 py-1 text-xs text-[#233CB5] hover:bg-[#233CB5]/10"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    submit();
                  }
                }}
                placeholder="Ask Salt anything"
                className="flex-1 rounded-xl border border-[#233CB5]/20 px-3 py-2 text-sm outline-none focus:border-[#233CB5]"
              />
              <button type="button" onClick={submit} className="rounded-xl bg-[#E26912] px-3 py-2 text-sm font-medium text-white hover:bg-[#cd5e12]">
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
