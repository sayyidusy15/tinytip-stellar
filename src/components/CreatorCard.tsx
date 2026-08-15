"use client";

import Link from "next/link";
import { formatXlm, Creator, shortenAddress } from "@/lib/stellar";

interface CreatorCardProps {
  creator: Creator;
  onTipClick?: (creator: Creator) => void;
}

export default function CreatorCard({ creator, onTipClick }: CreatorCardProps) {
  return (
    <div className="glass-card rounded-2xl p-5 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
      <div>
        {/* Avatar & Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 p-0.5 shadow-md">
              <div className="w-full h-full bg-zinc-900 rounded-[10px] flex items-center justify-center text-xl font-bold text-white uppercase">
                {creator.name.charAt(0)}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
                {creator.name}
              </h3>
              <p className="text-xs font-mono text-zinc-400">@{creator.username}</p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
            {shortenAddress(creator.wallet)}
          </span>
        </div>

        {/* Bio */}
        <p className="text-xs text-zinc-300 line-clamp-2 mb-4 leading-relaxed">
          {creator.bio || "Building cool open-source things on Stellar."}
        </p>
      </div>

      {/* Metrics & Tip CTA */}
      <div>
        <div className="grid grid-cols-2 gap-2 mb-4 bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800/60">
          <div>
            <span className="text-[10px] font-medium text-zinc-400 block">Total Received</span>
            <span className="text-sm font-extrabold text-emerald-400 font-mono">
              {formatXlm(creator.totalReceived)}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-medium text-zinc-400 block">Supporters</span>
            <span className="text-sm font-extrabold text-white font-mono">
              {creator.supporterCount}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onTipClick && onTipClick(creator)}
            className="flex-1 gradient-button py-2 px-3 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span>❤️ Send Micro-Tip</span>
          </button>

          <Link
            href={`/creator/${creator.username}`}
            className="px-3 py-2 rounded-xl text-xs font-medium text-zinc-400 bg-zinc-800/60 hover:bg-zinc-700/60 hover:text-white transition-colors"
          >
            View ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
