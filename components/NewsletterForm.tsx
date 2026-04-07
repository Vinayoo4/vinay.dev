// components/NewsletterForm.tsx
"use client";
import { useState } from "react";

const API_URL = '';

interface NewsletterFormProps {
  onSkip?: () => void;
  onSubmitted?: () => void;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({ onSkip, onSubmitted }) => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        let message = "Subscription failed";
        try {
          const data = await res.json();
          message = data.message || message;
        } catch {
          // JSON parse failed — use default message
        }
        throw new Error(message);
      }
      setSubmitted(true);
      if (onSubmitted) setTimeout(onSubmitted, 1800);
    } catch (err: any) {
      setError(err.message || "Could not subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-10 flex flex-col items-center justify-center relative">
      {/* Skip button */}
      <button
        onClick={onSkip}
        className="absolute top-4 right-4 px-4 py-1.5 text-xs border border-green-700 text-green-500 hover:bg-green-900/40 hover:text-green-300 transition-all rounded"
      >
        SKIP [→]
      </button>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h2 className="text-2xl mb-2 text-green-300">📡 Join the Network</h2>
          <p className="text-green-700 text-sm mb-6">
            Subscribe for updates, new projects, and future missions.
          </p>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-3 bg-black border border-green-600 placeholder-green-800 text-green-300 rounded focus:outline-none focus:border-green-400 transition-colors"
          />
          {error && (
            <p className="text-red-400 text-sm mb-3">{error}</p>
          )}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-green-700 text-black rounded hover:bg-green-500 transition-colors disabled:opacity-50 font-bold"
            >
              {loading ? "TRANSMITTING..." : "SUBSCRIBE"}
            </button>
            {onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="px-4 py-2 border border-green-800 text-green-700 rounded hover:border-green-600 hover:text-green-500 transition-colors text-sm"
              >
                Skip
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="text-center">
          <div className="text-4xl mb-4">📨</div>
          <h2 className="text-xl text-green-300">Transmission received.</h2>
          <p className="text-green-600 mt-2">Welcome to the network, Agent.</p>
          <p className="text-green-800 text-xs mt-4">Entering portal...</p>
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;