"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchChatData, sendChatMessage } from "@/lib/data";
import { Send, MessageSquare, Hexagon, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ChatMsg {
  id: string;
  room: string;
  user: string;
  message: string;
  timestamp: string;
}

interface Room {
  id: string;
  name: string;
  description: string;
}

export default function ChatPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [currentRoom, setCurrentRoom] = useState("general");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchChatData().then((data) => {
      setRooms(data.rooms || []);
      setMessages(data.messages || []);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setLoading(true);

    const temp: ChatMsg = {
      id: Date.now().toString(),
      room: currentRoom,
      user: "You",
      message: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, temp]);
    setInput("");

    try {
      const res = await sendChatMessage(currentRoom, "You", temp.message);
      if (res.autoReply) {
        setMessages((prev) => [...prev, res.autoReply]);
      }
    } catch {
      // fails silently — data stays locally
    }
    setLoading(false);
  };

  const roomMessages = messages.filter((m) => !m.room || m.room === currentRoom);

  return (
    <div className="min-h-screen bg-neural py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-neon-cyan hover:underline font-mono mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-3">
            <span className="text-neon-purple">Neural</span> Chat
          </h1>
          <p className="text-gray-500 font-mono text-sm">
            Talk to SaltedHash AI or chat with visitors. Auto-replies fire on keywords.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setCurrentRoom(room.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                currentRoom === room.id
                  ? "bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                  : "glass-panel text-gray-400 border border-gray-800 hover:border-neon-purple/20"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {room.name}
            </button>
          ))}
        </div>

        <div className="rounded-2xl glass-panel border border-neon-purple/10 overflow-hidden">
          <div className="h-[50vh] overflow-y-auto p-4 space-y-3">
            {roomMessages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Hexagon className="w-10 h-10 text-neon-purple/30 mb-3" strokeWidth={1} />
                <p className="text-sm text-gray-600 font-mono">No messages yet.</p>
                <p className="text-xs text-gray-700 font-mono mt-1">Type something to start the conversation.</p>
              </div>
            )}

            <AnimatePresence>
              {roomMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.user === "You" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.user === "You"
                        ? "bg-neon-purple/20 border border-neon-purple/20"
                        : msg.user === "SaltedHash AI"
                        ? "bg-neon-cyan/10 border border-neon-cyan/20"
                        : "glass-panel border border-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-mono ${
                        msg.user === "You" ? "text-neon-purple" :
                        msg.user === "SaltedHash AI" ? "text-neon-cyan" : "text-gray-500"
                      }`}>
                        {msg.user}
                      </span>
                      {msg.user === "SaltedHash AI" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-neon-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-gray-300 font-mono leading-relaxed">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSend} className="border-t border-neon-purple/10 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#050505] border border-gray-800 focus:border-neon-purple/40 text-sm text-gray-200 font-mono outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-xl bg-neon-purple/20 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-[10px] text-gray-700 font-mono mt-4 text-center">
          Messages are stored locally in /data/chat.json. Auto-replies are rule-based, not AI-generated.
        </p>
      </div>
    </div>
  );
}
