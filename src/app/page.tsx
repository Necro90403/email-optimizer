"use client";

import { useState } from "react";
import ResultCard from "@/components/ResultCard";
import PricingTable from "@/components/PricingTable";

interface Suggestion {
  subject: string;
  score: number;
  reason: string;
}

interface Result {
  original: string;
  suggestions: Suggestion[];
}

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjectLine: input.trim() }),
      });

      const rem = res.headers.get("X-RateLimit-Remaining");
      if (rem) setRemaining(parseInt(rem));

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent" />
        <nav className="relative max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">
            SubjectLine<span className="text-indigo-400">.ai</span>
          </span>
          <a
            href="#pricing"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Pricing
          </a>
        </nav>

        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-20 text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
            AI-Powered Email Optimization
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5">
            Get 10 AI-optimized{" "}
            <span className="text-indigo-400">subject lines</span> in seconds
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">
            Stop guessing. Paste your subject line, get 10 data-backed
            alternatives ranked by predicted open rate. 3x your email
            performance.
          </p>

          {/* Demo Input */}
          <form
            id="demo"
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='e.g. "Don&#39;t miss our spring sale!"'
              maxLength={200}
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-7 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all text-sm disabled:opacity-40 shrink-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Optimizing...
                </span>
              ) : (
                "Optimize"
              )}
            </button>
          </form>

          {remaining !== null && (
            <p className="mt-3 text-xs text-white/30">
              {remaining} free generation{remaining !== 1 ? "s" : ""} remaining today
            </p>
          )}
        </div>
      </header>

      {/* Results */}
      {(result || error) && (
        <section className="max-w-3xl mx-auto px-6 pb-16">
          {error && (
            <div className="border border-red-500/30 bg-red-500/5 rounded-xl p-5 text-center">
              <p className="text-red-400 text-sm">{error}</p>
              {error.includes("upgrade") && (
                <a
                  href="#pricing"
                  className="inline-block mt-3 text-indigo-400 hover:text-indigo-300 text-sm underline"
                >
                  View Pro plans
                </a>
              )}
            </div>
          )}
          {result && result.suggestions?.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-white/30 mb-4">
                Original: &ldquo;{result.original}&rdquo;
              </p>
              {result.suggestions.map((s: Suggestion, i: number) => (
                <ResultCard key={i} suggestion={s} rank={i + 1} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Social Proof */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-t border-white/5">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <p className="text-3xl font-bold text-white">3x</p>
            <p className="text-sm text-white/40 mt-1">avg open rate boost</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">10</p>
            <p className="text-sm text-white/40 mt-1">alternatives per query</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">&lt;3s</p>
            <p className="text-sm text-white/40 mt-1">generation time</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400 font-bold text-sm">
              1
            </div>
            <h3 className="font-semibold mb-2">Paste your subject line</h3>
            <p className="text-sm text-white/40">
              Enter the email subject line you want to improve
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400 font-bold text-sm">
              2
            </div>
            <h3 className="font-semibold mb-2">AI analyzes & optimizes</h3>
            <p className="text-sm text-white/40">
              Our AI uses proven copywriting techniques to generate alternatives
            </p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-indigo-400 font-bold text-sm">
              3
            </div>
            <h3 className="font-semibold mb-2">Pick the winner</h3>
            <p className="text-sm text-white/40">
              Choose from 10 ranked alternatives with predicted open rates
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center mb-3">Simple pricing</h2>
        <p className="text-white/40 text-center mb-10">
          Start free. Upgrade when you need unlimited.
        </p>
        <PricingTable />
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-16 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center mb-10">FAQ</h2>
        <div className="space-y-6">
          {[
            {
              q: "How does the AI optimize subject lines?",
              a: "We use advanced AI trained on millions of high-performing email campaigns. It applies proven techniques like curiosity gaps, urgency triggers, and power words to maximize your open rates.",
            },
            {
              q: "Is my data stored?",
              a: "No. Subject lines are processed in real-time and never stored. Your email content remains private.",
            },
            {
              q: "Can I cancel my Pro subscription anytime?",
              a: "Yes, cancel anytime with one click. No commitments, no questions asked.",
            },
            {
              q: "What email platforms does this work with?",
              a: "Any! Just copy the optimized subject line and paste it into Mailchimp, ConvertKit, HubSpot, Gmail, or any email tool.",
            },
          ].map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-white mb-1">{faq.q}</h3>
              <p className="text-sm text-white/40">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/20">
        <p>
          Built by{" "}
          <a
            href="https://agenticservicesllc.com"
            className="text-white/30 hover:text-white/50"
            target="_blank"
            rel="noopener"
          >
            Agentic Services LLC
          </a>
        </p>
      </footer>
    </div>
  );
}
