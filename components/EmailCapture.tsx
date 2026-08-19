"use client";

import { useState } from "react";

interface Toast {
  type: "success" | "error";
  message: string;
}

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<Toast | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setToast(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      setStatus("success");
      setEmail("");
      setToast({ type: "success", message: "Check your inbox for the free recipes! 📩" });
    } catch {
      setStatus("error");
      setToast({ type: "error", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === "loading"}
          className="flex-1 rounded-xl border border-border bg-surface px-5 py-3.5 text-base text-ink placeholder:text-ink-secondary focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-forest px-6 py-3.5 font-bold text-white hover:bg-forest-hover transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "..." : "Get Free Recipes"}
        </button>
      </form>

      {toast && (
        <div
          className={`mt-3 text-center text-sm ${
            toast.type === "success" ? "text-accent" : "text-red-600"
          } animate-fade-in-up`}
          role="alert"
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}