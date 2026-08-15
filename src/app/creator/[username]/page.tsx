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

  const creator: Creator = {
    username: username || "ahan",
    name: username === "ahan" ? "Ahan" : username,
    bio: "Building open-source developer tools, Stellar smart contract tutorials, and decentralized infrastructure.",
    wallet: "GAMCB2RP4WONAMRUQA5DG342TDACC4TYEIHOAO5JD7BN2HL4EK3TCBY2",
    totalReceived: BigInt(874_2000000),
    supporterCount: 342,
    tipCount: 421,
  };

  const recentTips: Tip[] = [
    {
      id: BigInt(101),
      donor: "GA22...3IH",
      creatorUsername: creator.username,
      amount: BigInt(10_0000000),
      message: "Thanks for building open-source tooling! 🚀",
      timestamp: Date.now() - 600000,
    },
    {
      id: BigInt(102),
      donor: "GBX7...99Z",
      creatorUsername: creator.username,
      amount: BigInt(25_0000000),
      message: "Super helpful guide!",
      timestamp: Date.now() - 3600000,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Profile Header Card */}
      <div className="matte-card p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#f0fdf0] border border-[#d4ecd4] flex items-center justify-center text-2xl font-bold text-[#5d750f]">
              {creator.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a202c]">{creator.name}</h1>
              <p className="text-xs font-mono text-[#5d750f] font-semibold mb-2">@{creator.username}</p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f8f9fb] border border-[#e2e8f0] text-[11px] font-mono text-[#64748b]">
                <span>Wallet:</span>
                <span className="text-[#1a202c] font-bold">{shortenAddress(creator.wallet)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowTipModal(true)}
            className="olive-button px-6 py-3 text-xs flex items-center justify-center gap-2"
          >
            <span>Support {creator.name}</span>
            <span>→</span>
          </button>
        </div>

        <p className="text-xs text-[#64748b] leading-relaxed max-w-2xl">{creator.bio}</p>

        {/* Creator Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#e8ecf1]">
          <div className="bg-[#f8f9fb] p-4 rounded-2xl border border-[#e8ecf1]">
            <span className="text-xs text-[#94a3b8] block">Total Received</span>
            <span className="text-lg sm:text-xl font-bold text-[#5d750f] font-mono">
              {formatXlm(creator.totalReceived)}
            </span>
          </div>

          <div className="bg-[#f8f9fb] p-4 rounded-2xl border border-[#e8ecf1]">
            <span className="text-xs text-[#94a3b8] block">Supporters</span>
            <span className="text-lg sm:text-xl font-bold text-[#1a202c] font-mono">
              {creator.supporterCount}
            </span>
          </div>

          <div className="bg-[#f8f9fb] p-4 rounded-2xl border border-[#e8ecf1]">
            <span className="text-xs text-[#94a3b8] block">Total Tips</span>
            <span className="text-lg sm:text-xl font-bold text-[#475569] font-mono">
              {creator.tipCount}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Micro-Tip Presets */}
      <div className="matte-card p-6 space-y-4">
        <h3 className="font-bold text-sm text-[#1a202c]">Send a Micro-Tip</h3>
        <p className="text-xs text-[#64748b]">
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
              className="p-3 rounded-2xl bg-[#f8f9fb] border border-[#e2e8f0] hover:border-[#5d750f] hover:bg-[#f0fdf0] transition-all text-center group"
            >
              <span className="text-xs font-bold text-[#1a202c] block group-hover:text-[#5d750f]">
                {preset.label}
              </span>
              <span className="text-[10px] text-[#94a3b8] font-mono">{preset.xlm}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-[#1a202c]">Recent Supporters</h3>
        <ActivityFeed tips={recentTips} />
      </div>

      {showTipModal && (
        <TipModal creator={creator} onClose={() => setShowTipModal(false)} />
      )}
    </div>
  );
}
