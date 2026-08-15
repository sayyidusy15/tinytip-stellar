"use client";

import { Tip, formatXlm, shortenAddress } from "@/lib/stellar";

interface ActivityFeedProps {
  tips: Tip[];
}

export default function ActivityFeed({ tips }: ActivityFeedProps) {
  if (!tips || tips.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 text-center text-zinc-400 border border-zinc-800/80">
        <span className="text-2xl mb-2 block">✨</span>
        <p className="text-xs">No micro-tips sent yet. Be the first supporter!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {tips.map((tip, idx) => (
        <div
          key={Number(tip.id) || idx}
          className="glass-card rounded-xl p-3.5 border border-zinc-800/80 flex items-center justify-between gap-3 hover:border-zinc-700/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              ❤️
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-mono text-zinc-300 font-medium">
                  {shortenAddress(tip.donor)}
                </span>
                <span className="text-zinc-500">tipped</span>
                <span className="font-bold text-emerald-400">@{tip.creatorUsername}</span>
              </div>
              {tip.message && (
                <p className="text-[11px] text-zinc-400 italic mt-0.5">"{tip.message}"</p>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono font-bold text-xs text-emerald-400 block">
              +{formatXlm(tip.amount)}
            </span>
            <span className="text-[10px] text-zinc-500">Stellar Testnet</span>
          </div>
        </div>
      ))}
    </div>
  );
}
