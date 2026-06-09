// components/NewsletterForm.tsx
"use client";
import { useState } from "react";

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Replace with API call to newsletter provider
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-10 flex flex-col items-center justify-center crt">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h2 className="text-2xl mb-6">🧾 Subscribe for future missions</h2>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-black border border-green-500 placeholder-green-600 text-green-300"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-black rounded hover:bg-green-400"
          >
            Subscribe
          </button>
        </form>
      ) : (
        <h2 className="text-xl">📨 Transmission received. Welcome to the network, Agent.</h2>
      )}
    </div>
  );
};

export default NewsletterForm;