"use client";

import { Tip, formatXlm, shortenAddress } from "@/lib/stellar";

interface ActivityFeedProps {
  tips: Tip[];
}

export default function ActivityFeed({ tips }: ActivityFeedProps) {
  if (!tips || tips.length === 0) {
    return (
      <div className="matte-card p-6 text-center text-[#788a9e]">
        <p className="text-xs">No micro-tips sent yet. Be the first supporter!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {tips.map((tip, idx) => (
        <div
          key={Number(tip.id) || idx}
          className="matte-card p-4 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#5d750f]/15 border border-[#5d750f]/30 flex items-center justify-center text-[#7a9a14] font-bold text-xs">
              ✓
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-mono text-[#c0cfdf] font-medium">
                  {shortenAddress(tip.donor)}
                </span>
                <span className="text-[#64768c]">tipped</span>
                <span className="font-bold text-[#7a9a14]">@{tip.creatorUsername}</span>
              </div>
              {tip.message && (
                <p className="text-[11px] text-[#8aa0b8] italic mt-0.5">"{tip.message}"</p>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="font-mono font-bold text-xs text-[#7a9a14] block">
              +{formatXlm(tip.amount)}
            </span>
            <span className="text-[10px] text-[#58697d]">Stellar Testnet</span>
          </div>
        </div>
      ))}
    </div>
  );
}
