"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ActivityFeed from "@/components/ActivityFeed";
import { formatXlm, shortenAddress, getActiveWalletAddress, Tip } from "@/lib/stellar";

export default function DashboardPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  useEffect(() => {
    const { address, isViewOnly } = getActiveWalletAddress();
    if (address) {
      setWalletAddress(address);
      setIsViewOnly(isViewOnly);
    }
  }, []);

  const creatorStats = {
    username: "ahan",
    name: "Ahan",
    totalReceived: BigInt(874_2000000), // 87.42 XLM
    supporters: 342,
    totalTips: 421,
    averageTip: "0.20 XLM",
  };

  const dashboardTips: Tip[] = [
    {
      id: BigInt(201),
      donor: "GAMC...BY2",
      creatorUsername: "ahan",
      amount: BigInt(25_0000000),
      message: "Keep up the awesome work!",
      timestamp: Date.now() - 120000,
    },
    {
      id: BigInt(202),
      donor: "GA22...3IH",
      creatorUsername: "ahan",
      amount: BigInt(10_0000000),
      message: "Thank you for the open source code!",
      timestamp: Date.now() - 3600000,
    },
  ];

  if (!walletAddress) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-[#121924] border border-[#233347] text-white text-2xl flex items-center justify-center mx-auto">
          🔐
        </div>
        <h1 className="text-2xl font-bold text-white">Creator Dashboard</h1>
        <p className="text-xs text-[#8ca0b8]">
          Connect your Stellar wallet or enter your address to view your received micro-tips and creator statistics.
        </p>
        <Link
          href="/connect"
          className="olive-button inline-flex px-7 py-3 text-xs"
        >
          Connect Wallet →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Creator Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-[#788a9e] font-mono">
              Wallet: {shortenAddress(walletAddress)}
            </span>
            {isViewOnly && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                View-Only
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/creator/${creatorStats.username}`}
          className="px-4 py-2 rounded-full text-xs font-semibold text-[#7a9a14] bg-[#5d750f]/15 border border-[#5d750f]/30 hover:bg-[#5d750f]/25 transition-colors w-fit"
        >
          View Public Page ↗
        </Link>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="matte-card p-5">
          <span className="text-xs font-medium text-[#788a9e] block mb-1">Total Diterima</span>
          <span className="text-xl font-bold text-[#7a9a14] font-mono">
            {formatXlm(creatorStats.totalReceived)}
          </span>
          <span className="text-[10px] text-[#58687a] block mt-1">Stellar Testnet</span>
        </div>

        <div className="matte-card p-5">
          <span className="text-xs font-medium text-[#788a9e] block mb-1">Total Pendukung</span>
          <span className="text-xl font-bold text-white font-mono">
            {creatorStats.supporters}
          </span>
          <span className="text-[10px] text-[#58687a] block mt-1">Unique Supporters</span>
        </div>

        <div className="matte-card p-5">
          <span className="text-xs font-medium text-[#788a9e] block mb-1">Total Micro-Tips</span>
          <span className="text-xl font-bold text-[#a3b3c7] font-mono">
            {creatorStats.totalTips}
          </span>
          <span className="text-[10px] text-[#58687a] block mt-1">On-chain Transactions</span>
        </div>

        <div className="matte-card p-5">
          <span className="text-xs font-medium text-[#788a9e] block mb-1">Rata-rata Tip</span>
          <span className="text-xl font-bold text-white font-mono">
            {creatorStats.averageTip}
          </span>
          <span className="text-[10px] text-[#58687a] block mt-1">per supporter</span>
        </div>
      </div>

      {/* Share Support Link Widget */}
      <div className="matte-card p-6 space-y-3">
        <h3 className="font-bold text-sm text-white">Your Public Support Link</h3>
        <p className="text-xs text-[#8ca0b8]">
          Share this URL on your GitHub README, Twitter bio, or blog posts to receive micro-tips:
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={`https://tinytip.app/creator/${creatorStats.username}`}
            className="input-field flex-1 px-4 py-2.5 text-xs text-[#7a9a14] font-mono"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(`https://tinytip.app/creator/${creatorStats.username}`);
              alert("Copied support link to clipboard!");
            }}
            className="olive-button px-4 py-2.5 text-xs"
          >
            Copy Link
          </button>
        </div>
      </div>

      {/* Recent Tips Log */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-white">Latest Tips Received</h3>
        <ActivityFeed tips={dashboardTips} />
      </div>
    </div>
  );
}
