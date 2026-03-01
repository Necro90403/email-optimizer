"use client";

import { useState } from "react";

export default function PricingTable() {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Coming soon!");
      }
    } catch {
      alert("Payment not available yet. Coming soon!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="pricing" className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      {/* Free Tier */}
      <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02]">
        <h3 className="text-lg font-semibold text-white mb-1">Free</h3>
        <p className="text-4xl font-bold text-white mb-1">
          $0<span className="text-lg font-normal text-white/40">/mo</span>
        </p>
        <p className="text-white/40 text-sm mb-6">Try it out, no signup</p>
        <ul className="space-y-3 text-sm text-white/60">
          <li className="flex items-center gap-2">
            <span className="text-green-400">&#10003;</span> 3 optimizations per
            day
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">&#10003;</span> 10 subject line
            alternatives
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-400">&#10003;</span> Open-rate
            predictions
          </li>
        </ul>
        <a
          href="#demo"
          className="mt-6 block text-center py-2.5 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all text-sm"
        >
          Try Free
        </a>
      </div>

      {/* Pro Tier */}
      <div className="border border-indigo-500/50 rounded-2xl p-8 bg-indigo-500/[0.05] relative">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          POPULAR
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">Pro</h3>
        <p className="text-4xl font-bold text-white mb-1">
          $9<span className="text-lg font-normal text-white/40">/mo</span>
        </p>
        <p className="text-white/40 text-sm mb-6">For serious email marketers</p>
        <ul className="space-y-3 text-sm text-white/60">
          <li className="flex items-center gap-2">
            <span className="text-indigo-400">&#10003;</span> Unlimited
            optimizations
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-400">&#10003;</span> 10 subject line
            alternatives
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-400">&#10003;</span> Open-rate
            predictions
          </li>
          <li className="flex items-center gap-2">
            <span className="text-indigo-400">&#10003;</span> Priority
            generation speed
          </li>
        </ul>
        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="mt-6 w-full py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition-all text-sm disabled:opacity-50"
        >
          {loading ? "Loading..." : "Upgrade to Pro"}
        </button>
      </div>
    </div>
  );
}
