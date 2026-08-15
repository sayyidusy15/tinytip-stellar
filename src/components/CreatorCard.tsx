"use client";

import Link from "next/link";
import { Creator, formatXlm, shortenAddress } from "@/lib/stellar";

interface CreatorCardProps {
  creator: Creator;
  onTipClick: (creator: Creator) => void;
}

export default function CreatorCard({ creator, onTipClick }: CreatorCardProps) {
  return (
    <div className="matte-card-interactive p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f0fdf0] border border-[#d4ecd4] flex items-center justify-center text-[#5d750f] font-bold text-sm">
            {creator.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <Link
              href={`/creator/${creator.username}`}
              className="font-bold text-sm text-[#1a202c] hover:text-[#5d750f] transition-colors"
            >
              {creator.name}
            </Link>
            <p className="text-[11px] font-mono text-[#94a3b8]">@{creator.username}</p>
          </div>
        </div>

        <span className="text-[10px] text-[#94a3b8] font-mono">{shortenAddress(creator.wallet)}</span>
      </div>

      <p className="text-xs text-[#64748b] leading-relaxed line-clamp-2">{creator.bio}</p>

      <div className="flex items-center gap-4 text-[11px] text-[#94a3b8] pt-1 border-t border-[#f1f5f9]">
        <span>
          <strong className="text-[#5d750f] font-mono">{formatXlm(creator.totalReceived)}</strong> received
        </span>
        <span>{creator.supporterCount} supporters</span>
      </div>

      <button
        onClick={() => onTipClick(creator)}
        className="olive-button w-full py-2.5 text-xs flex items-center justify-center gap-1.5"
      >
        <span>Send Micro-Tip</span>
        <span>→</span>
      </button>
    </div>
  );
}
