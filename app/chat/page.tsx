"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";
import { fetchChatMessages, sendChatMessage } from "@/lib/api";
import { io } from "socket.io-client";

// Define the ChatMessage type
type ChatMessage = {
  _id: string;
  user: string;
  message: string;
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roomId, setRoomId] = useState("general");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Initialize socket connection
    const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    socketRef.current = io(SOCKET_URL);

    // Join the room
    socketRef.current.emit('join-room', roomId);

    // Listen for new messages
    socketRef.current.on('receive-message', (message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/api/chat`);
        if (!res.ok) throw new Error('Failed to load messages');
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        setError("Could not load chat messages.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: "Anonymous", message: newMessage })
      });
      if (!res.ok) throw new Error('Failed to send message');
      const { data } = await res.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (err) {
      setError("Could not send message.");
    } finally {
      setLoading(false);
    }
  };

  const rooms = [
    { id: "general", name: "General" },
    { id: "tech", name: "Technology" },
    { id: "finance", name: "Finance" },
    { id: "design", name: "Design" }
  ];

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-yellow-500 mb-6">Anonymous Chat</h1>
          <p className="text-gray-400">
            Join the conversation anonymously. Messages are encrypted for privacy.
          </p>
        </motion.div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setRoomId(room.id)}
              className={`px-4 py-2 rounded-full flex items-center space-x-1 whitespace-nowrap transition-colors ${roomId === room.id ? 'bg-yellow-500 text-black' : 'bg-yellow-500/10 text-gray-300 hover:bg-yellow-500/20'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{room.name}</span>
            </button>
          ))}
        </div>

        <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl overflow-hidden flex flex-col h-[60vh]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <div className="text-center text-gray-400">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <motion.div
                  key={msg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-yellow-500/10 rounded-lg p-3 max-w-[80%]">
                  <p className="text-gray-300">{msg.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </p>
                </motion.div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-yellow-500/10 p-4 flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-black/50 border border-yellow-500/20 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg px-4 py-2 flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Note: This is a public chat room. Please be respectful and follow community guidelines.
          </p>
        </div>
      </div>
    </main>
  );
}