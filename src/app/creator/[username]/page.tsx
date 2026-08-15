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
    totalReceived: BigInt(874_2000000), // 87.42 XLM
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
            <div className="w-16 h-16 rounded-2xl bg-[#1c2838] border border-[#2b3d54] flex items-center justify-center text-2xl font-bold text-white">
              {creator.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{creator.name}</h1>
              <p className="text-xs font-mono text-[#7a9a14] font-semibold mb-2">@{creator.username}</p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0b1017] border border-[#1b2636] text-[11px] font-mono text-[#8ca0b8]">
                <span>Wallet:</span>
                <span className="text-white font-bold">{shortenAddress(creator.wallet)}</span>
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

        <p className="text-xs text-[#9eb2c9] leading-relaxed max-w-2xl">{creator.bio}</p>

        {/* Creator Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#1b2636]">
          <div className="bg-[#0b1017] p-4 rounded-2xl border border-[#1b2636]">
            <span className="text-xs text-[#788a9e] block">Total Received</span>
            <span className="text-lg sm:text-xl font-bold text-[#7a9a14] font-mono">
              {formatXlm(creator.totalReceived)}
            </span>
          </div>

          <div className="bg-[#0b1017] p-4 rounded-2xl border border-[#1b2636]">
            <span className="text-xs text-[#788a9e] block">Supporters</span>
            <span className="text-lg sm:text-xl font-bold text-white font-mono">
              {creator.supporterCount}
            </span>
          </div>

          <div className="bg-[#0b1017] p-4 rounded-2xl border border-[#1b2636]">
            <span className="text-xs text-[#788a9e] block">Total Tips</span>
            <span className="text-lg sm:text-xl font-bold text-[#a3b3c7] font-mono">
              {creator.tipCount}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Micro-Tip Presets */}
      <div className="matte-card p-6 space-y-4">
        <h3 className="font-bold text-sm text-white">Send a Micro-Tip</h3>
        <p className="text-xs text-[#8ca0b8]">
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
              className="p-3 rounded-2xl bg-[#0b1017] border border-[#1b2636] hover:border-[#5d750f] hover:bg-[#121924] transition-all text-center group"
            >
              <span className="text-xs font-bold text-white block group-hover:text-[#7a9a14]">
                {preset.label}
              </span>
              <span className="text-[10px] text-[#64768c] font-mono">{preset.xlm}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity for this creator */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-white">Recent Supporters</h3>
        <ActivityFeed tips={recentTips} />
      </div>

      {/* Tip Modal */}
      {showTipModal && (
        <TipModal creator={creator} onClose={() => setShowTipModal(false)} />
      )}
    </div>
  );
}
