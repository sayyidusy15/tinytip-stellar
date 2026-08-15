"use client";

import { useState } from "react";
import Link from "next/link";
import CreatorCard from "@/components/CreatorCard";
import TipModal from "@/components/TipModal";
import ActivityFeed from "@/components/ActivityFeed";
import { Creator, Tip } from "@/lib/stellar";

// Sample initial creators for demonstration & instant testnet interaction
const INITIAL_CREATORS: Creator[] = [
  {
    username: "ahan",
    name: "Ahan",
    bio: "Open Source Developer building Web3 developer tooling & Stellar contracts.",
    wallet: "GAMCB2RP4WONAMRUQA5DG342TDACC4TYEIHOAO5JD7BN2HL4EK3TCBY2",
    totalReceived: BigInt(874_2000000), // 87.42 XLM
    supporterCount: 342,
    tipCount: 421,
  },
  {
    username: "sarah_ui",
    name: "Sarah Chen",
    bio: "UI/UX Designer crafting beautiful open-source Web3 design systems.",
    wallet: "GA22G44TKSBBH325D2JONN5AES33FDZKB33JZATM6P3R3V3WVMHHE3IH",
    totalReceived: BigInt(452_1000000), // 45.21 XLM
    supporterCount: 189,
    tipCount: 210,
  },
  {
    username: "bandung_dev",
    name: "Bandung Builders",
    bio: "Community of Stellar developers organizing workshops and open-source public goods.",
    wallet: "GD52F3...XLM78",
    totalReceived: BigInt(1250_0000000), // 125.00 XLM
    supporterCount: 512,
    tipCount: 680,
  },
];

const INITIAL_TIPS: Tip[] = [
  {
    id: BigInt(1),
    donor: "GDKX...89A2",
    creatorUsername: "ahan",
    amount: BigInt(10_0000000), // 1.0 XLM ($0.10)
    message: "Loved your Soroban guide! 🚀",
    timestamp: Date.now() - 300000,
  },
  {
    id: BigInt(2),
    donor: "GA22...3IH",
    creatorUsername: "sarah_ui",
    amount: BigInt(25_0000000), // 2.5 XLM ($0.25)
    message: "Great design components!",
    timestamp: Date.now() - 900000,
  },
  {
    id: BigInt(3),
    donor: "GAMC...BY2",
    creatorUsername: "bandung_dev",
    amount: BigInt(5_0000000), // 0.5 XLM ($0.05)
    message: "Thanks for organizing the meetup!",
    timestamp: Date.now() - 1800000,
  },
];

export default function Home() {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [creators] = useState<Creator[]>(INITIAL_CREATORS);
  const [recentTips] = useState<Tip[]>(INITIAL_TIPS);

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6 py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold animate-pulse-subtle">
          <span>✨ Built on Stellar Soroban</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Small tips. <br />
          <span className="gradient-text">Real impact.</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl mx-auto">
          Support creators, open-source developers, artists, and public goods with micro-payments as small as a few cents.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/explore"
            className="gradient-button w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white shadow-xl shadow-emerald-500/20"
          >
            Explore Creators 🔍
          </Link>
          <Link
            href="/create-profile"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all text-center"
          >
            Become a Creator 🚀
          </Link>
        </div>

        {/* Live Metrics Header */}
        <div className="pt-8 grid grid-cols-3 gap-4 border-t border-zinc-800/80 max-w-lg mx-auto">
          <div>
            <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">$0.05</span>
            <span className="text-[11px] text-zinc-500 block">Min Micro-Tip</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">~5 sec</span>
            <span className="text-[11px] text-zinc-500 block">Stellar Finality</span>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold text-indigo-400 font-mono">&lt;$0.0001</span>
            <span className="text-[11px] text-zinc-500 block">Transaction Fee</span>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">Featured Creators</h2>
            <p className="text-xs text-zinc-400">Discover creators building value on Stellar</p>
          </div>
          <Link
            href="/explore"
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            View all ({creators.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.username}
              creator={creator}
              onTipClick={(c) => setSelectedCreator(c)}
            />
          ))}
        </div>
      </section>

      {/* Recent Activity Ticker */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Recent Micro-Support Activity</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </h2>
        </div>
        <ActivityFeed tips={recentTips} />
      </section>

      {/* Why TinyTip + Stellar Card */}
      <section className="glass-card rounded-3xl p-8 border border-zinc-800/80 bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-emerald-950/20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-lg font-bold">
              💡
            </div>
            <h3 className="font-bold text-base text-white">Why Micro-Support?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Don't ask people for a big donation. Let them support what they value with a tiny payment as small as $0.05.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-lg font-bold">
              ⚡
            </div>
            <h3 className="font-bold text-base text-white">Powered by Stellar</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Stellar provides payment finality in ~5 seconds with sub-cent fees, making small-value transactions truly practical.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 text-lg font-bold">
              🔒
            </div>
            <h3 className="font-bold text-base text-white">Soroban Smart Contract</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Creator statistics, supporter counts, and event logs are immutably verified on Soroban Rust contracts.
            </p>
          </div>
        </div>
      </section>

      {/* Tip Modal */}
      {selectedCreator && (
        <TipModal
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
          onSuccess={() => {
            console.log("Tip completed successfully!");
          }}
        />
      )}
    </div>
  );
}
