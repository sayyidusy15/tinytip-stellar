"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ActivityFeed from "@/components/ActivityFeed";
import { formatXlm, shortenAddress, connectFreighter, Tip } from "@/lib/stellar";

export default function DashboardPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    connectFreighter().then((addr) => {
      if (addr) setWalletAddress(addr);
    });
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    const addr = await connectFreighter();
    if (addr) setWalletAddress(addr);
    setIsConnecting(false);
  };

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
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-3xl flex items-center justify-center mx-auto">
          🔐
        </div>
        <h1 className="text-2xl font-bold text-white">Creator Dashboard</h1>
        <p className="text-xs text-zinc-400">
          Connect your Stellar Freighter Wallet to view your received micro-tips and creator statistics.
        </p>
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="gradient-button px-6 py-3 rounded-xl font-bold text-sm text-white shadow-xl shadow-emerald-500/20"
        >
          {isConnecting ? "Connecting Wallet..." : "Connect Freighter Wallet"}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Creator Dashboard</h1>
          <p className="text-xs text-zinc-400 font-mono">
            Connected: {shortenAddress(walletAddress)}
          </p>
        </div>

        <Link
          href={`/creator/${creatorStats.username}`}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors w-fit"
        >
          View Public Support Link ↗
        </Link>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-zinc-800/80">
          <span className="text-xs font-medium text-zinc-400 block mb-1">Total Diterima</span>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono">
            {formatXlm(creatorStats.totalReceived)}
          </span>
          <span className="text-[10px] text-zinc-500 block mt-1">Stellar Testnet XLM</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-zinc-800/80">
          <span className="text-xs font-medium text-zinc-400 block mb-1">Total Pendukung</span>
          <span className="text-2xl font-extrabold text-white font-mono">
            {creatorStats.supporters}
          </span>
          <span className="text-[10px] text-zinc-500 block mt-1">Unique Supporters</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-zinc-800/80">
          <span className="text-xs font-medium text-zinc-400 block mb-1">Total Micro-Tips</span>
          <span className="text-2xl font-extrabold text-indigo-400 font-mono">
            {creatorStats.totalTips}
          </span>
          <span className="text-[10px] text-zinc-500 block mt-1">On-chain Transactions</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-zinc-800/80">
          <span className="text-xs font-medium text-zinc-400 block mb-1">Rata-rata Tip</span>
          <span className="text-2xl font-extrabold text-pink-400 font-mono">
            {creatorStats.averageTip}
          </span>
          <span className="text-[10px] text-zinc-500 block mt-1">per supporter</span>
        </div>
      </div>

      {/* Share Support Link Widget */}
      <div className="glass-card p-6 rounded-2xl border border-zinc-800/80 space-y-3">
        <h3 className="font-bold text-sm text-white">Your Public Micro-Support Link</h3>
        <p className="text-xs text-zinc-400">
          Share this URL on your GitHub README, Twitter bio, or blog posts to receive micro-tips:
        </p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={`https://tinytip.app/creator/${creatorStats.username}`}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-mono focus:outline-none"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(`https://tinytip.app/creator/${creatorStats.username}`);
              alert("Copied support link to clipboard!");
            }}
            className="gradient-button px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-md"
          >
            Copy Link 📋
          </button>
        </div>
      </div>

      {/* Recent Tips Log */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-white">Latest Tips Received</h3>
        <ActivityFeed tips={dashboardTips} />
      </div>
    </div>
  );
}
