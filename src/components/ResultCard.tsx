"use client";

interface Suggestion {
  subject: string;
  score: number;
  reason: string;
}

export default function ResultCard({
  suggestion,
  rank,
}: {
  suggestion: Suggestion;
  rank: number;
}) {
  const scoreColor =
    suggestion.score >= 8
      ? "text-green-400"
      : suggestion.score >= 6
        ? "text-yellow-400"
        : "text-gray-400";

  return (
    <div className="group relative border border-white/10 rounded-xl p-5 hover:border-indigo-500/50 transition-all bg-white/[0.02] hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-white/30">#{rank}</span>
            <span
              className={`text-xs font-bold ${scoreColor} bg-white/5 px-2 py-0.5 rounded-full`}
            >
              {suggestion.score}/10
            </span>
          </div>
          <p className="text-white font-medium text-lg leading-snug mb-2">
            {suggestion.subject}
          </p>
          <p className="text-white/50 text-sm">{suggestion.reason}</p>
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(suggestion.subject)}
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-white text-xs border border-white/10 rounded-lg px-3 py-1.5 hover:border-white/30"
        >
          Copy
        </button>
      </div>
    </div>
  );
}
