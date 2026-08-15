"use client";

import { use, useState } from "react";
import TipModal from "@/components/TipModal";
import ActivityFeed from "@/components/ActivityFeed";
import { formatXlm, shortenAddress, Creator, Tip } from "@/lib/stellar";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function CreatorProfilePage({ params }: PageProps) {
  const { username } = use(params);
  const [showTipModal, setShowTipModal] = useState(false);

  // Mock creator lookup
  const creator: Creator = {
    username: username || "ahan",
    name: username === "ahan" ? "Ahan" : username,
    bio: "Building open-source developer tools, Stellar smart contract tutorials, and decentralized infrastructure.",
    wallet: "GAMCB2RP4WONAMRUQA5DG342TDACC4TYEIHOAO5JD7BN2HL4EK3TCBY2",
    totalReceived: BigInt(874_2000000), // 87.42 XLM
    supporterCount: 342,
    tipCount: 421,
  };

  const recentTips: Tip[] = [
    {
      id: BigInt(101),
      donor: "GA22...3IH",
      creatorUsername: creator.username,
      amount: BigInt(10_0000000), // 1.0 XLM
      message: "Thanks for building open-source tooling! 🚀",
      timestamp: Date.now() - 600000,
    },
    {
      id: BigInt(102),
      donor: "GBX7...99Z",
      creatorUsername: creator.username,
      amount: BigInt(25_0000000), // 2.5 XLM
      message: "Super helpful guide!",
      timestamp: Date.now() - 3600000,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Profile Header Card */}
      <div className="glass-card rounded-3xl p-8 border border-zinc-800/80 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 via-indigo-500 to-pink-500 p-1 shadow-xl">
              <div className="w-full h-full bg-zinc-950 rounded-xl flex items-center justify-center text-3xl font-extrabold text-white">
                {creator.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{creator.name}</h1>
              <p className="text-xs font-mono text-emerald-400 font-medium mb-2">@{creator.username}</p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                <span>Wallet:</span>
                <span className="text-zinc-200">{shortenAddress(creator.wallet)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowTipModal(true)}
            className="gradient-button px-6 py-3 rounded-xl font-bold text-sm text-white shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            <span>❤️ Support {creator.name}</span>
          </button>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">{creator.bio}</p>

        {/* Creator Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80">
          <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/60">
            <span className="text-xs text-zinc-400 font-medium block">Total Received</span>
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">
              {formatXlm(creator.totalReceived)}
            </span>
          </div>

          <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/60">
            <span className="text-xs text-zinc-400 font-medium block">Supporters</span>
            <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              {creator.supporterCount}
            </span>
          </div>

          <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/60">
            <span className="text-xs text-zinc-400 font-medium block">Total Tips</span>
            <span className="text-xl sm:text-2xl font-extrabold text-indigo-400 font-mono">
              {creator.tipCount}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Micro-Tip Buttons */}
      <div className="glass-card rounded-2xl p-6 border border-zinc-800/80 space-y-4">
        <h3 className="font-bold text-base text-white">Send a Micro-Tip</h3>
        <p className="text-xs text-zinc-400">
          Select a predefined micro-amount to tip {creator.name} on Stellar Testnet:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: "$0.05", xlm: "0.5 XLM" },
            { label: "$0.10", xlm: "1.0 XLM" },
            { label: "$0.25", xlm: "2.5 XLM" },
            { label: "$0.50", xlm: "5.0 XLM" },
            { label: "$1.00", xlm: "10.0 XLM" },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => setShowTipModal(true)}
              className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all text-center group"
            >
              <span className="text-sm font-bold text-white block group-hover:text-emerald-400">
                {preset.label}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">{preset.xlm}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity for this creator */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-white">Recent Supporters</h3>
        <ActivityFeed tips={recentTips} />
      </div>

      {/* Tip Modal */}
      {showTipModal && (
        <TipModal creator={creator} onClose={() => setShowTipModal(false)} />
      )}
    </div>
  );
}
