"use client";

import Link from "next/link";
import { formatXlm, Creator, shortenAddress } from "@/lib/stellar";

interface CreatorCardProps {
  creator: Creator;
  onTipClick?: (creator: Creator) => void;
}

export default function CreatorCard({ creator, onTipClick }: CreatorCardProps) {
  return (
    <div className="matte-card-interactive p-6 flex flex-col justify-between group">
      <div>
        {/* Avatar & Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#1b2636] border border-[#2a3c54] flex items-center justify-center text-lg font-bold text-white uppercase">
              {creator.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#7a9a14] transition-colors">
                {creator.name}
              </h3>
              <p className="text-xs font-mono text-[#788a9e]">@{creator.username}</p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#101721] text-[#8fa0b5] border border-[#1e2a3a]">
            {shortenAddress(creator.wallet)}
          </span>
        </div>

        {/* Bio */}
        <p className="text-xs text-[#9eb2c9] line-clamp-2 mb-5 leading-relaxed">
          {creator.bio || "Building cool open-source things on Stellar."}
        </p>
      </div>

      {/* Metrics & Tip CTA */}
      <div>
        <div className="grid grid-cols-2 gap-2 mb-4 bg-[#0b1017] p-3 rounded-xl border border-[#1b2636]">
          <div>
            <span className="text-[10px] font-medium text-[#788a9e] block">Total Received</span>
            <span className="text-xs font-bold text-[#7a9a14] font-mono">
              {formatXlm(creator.totalReceived)}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-medium text-[#788a9e] block">Supporters</span>
            <span className="text-xs font-bold text-white font-mono">
              {creator.supporterCount}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onTipClick && onTipClick(creator)}
            className="flex-1 olive-button py-2.5 px-3 text-xs flex items-center justify-center gap-1.5"
          >
            <span>Send Micro-Tip</span>
            <span>→</span>
          </button>

          <Link
            href={`/creator/${creator.username}`}
            className="px-3.5 py-2.5 rounded-full text-xs font-medium text-[#9eb2c9] bg-[#141d28] hover:bg-[#1b2738] hover:text-white border border-[#233347] transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
