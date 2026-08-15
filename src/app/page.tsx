"use client";

import { useState } from "react";
import Link from "next/link";
import CreatorCard from "@/components/CreatorCard";
import TipModal from "@/components/TipModal";
import ActivityFeed from "@/components/ActivityFeed";
import { Creator, Tip } from "@/lib/stellar";

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
    amount: BigInt(10_0000000),
    message: "Loved your Soroban guide!",
    timestamp: Date.now() - 300000,
  },
  {
    id: BigInt(2),
    donor: "GA22...3IH",
    creatorUsername: "sarah_ui",
    amount: BigInt(25_0000000),
    message: "Great design components!",
    timestamp: Date.now() - 900000,
  },
  {
    id: BigInt(3),
    donor: "GAMC...BY2",
    creatorUsername: "bandung_dev",
    amount: BigInt(5_0000000),
    message: "Thanks for organizing the meetup!",
    timestamp: Date.now() - 1800000,
  },
];

export default function Home() {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [creators] = useState<Creator[]>(INITIAL_CREATORS);
  const [recentTips] = useState<Tip[]>(INITIAL_TIPS);

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-7 py-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141d27] border border-[#223347] text-[#9eb2c9] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#5d750f]"></span>
          <span>Powered by Stellar Soroban Testnet</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Small tips. <span className="text-[#7a9a14]">Real impact.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#9eb2c9] leading-relaxed max-w-2xl mx-auto">
          Support creators, open-source developers, artists, and public goods with micro-payments as small as a few cents.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/connect"
            className="olive-button w-full sm:w-auto px-7 py-3.5 text-sm flex items-center justify-center gap-2"
          >
            <span>Connect Wallet to Support</span>
            <span>→</span>
          </Link>

          <Link
            href="/explore"
            className="secondary-pill-button w-full sm:w-auto px-7 py-3.5 text-sm flex items-center justify-center gap-2"
          >
            <span>Explore Creators</span>
          </Link>
        </div>

        {/* Live Metrics Header */}
        <div className="pt-10 grid grid-cols-3 gap-4 border-t border-[#1a2533] max-w-xl mx-auto text-left">
          <div className="bg-[#101721] p-4 rounded-2xl border border-[#1b2838]">
            <span className="text-xl sm:text-2xl font-bold text-white font-mono block">$0.05</span>
            <span className="text-[11px] text-[#788a9e] block mt-0.5">Min Micro-Tip</span>
          </div>

          <div className="bg-[#101721] p-4 rounded-2xl border border-[#1b2838]">
            <span className="text-xl sm:text-2xl font-bold text-[#7a9a14] font-mono block">~5 sec</span>
            <span className="text-[11px] text-[#788a9e] block mt-0.5">Stellar Finality</span>
          </div>

          <div className="bg-[#101721] p-4 rounded-2xl border border-[#1b2838]">
            <span className="text-xl sm:text-2xl font-bold text-white font-mono block">&lt;$0.0001</span>
            <span className="text-[11px] text-[#788a9e] block mt-0.5">Network Fee</span>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Featured Creators</h2>
            <p className="text-xs text-[#8192a6]">Discover builders receiving micro-support on Stellar</p>
          </div>
          <Link
            href="/explore"
            className="text-xs font-semibold text-[#7a9a14] hover:text-[#8eb319] transition-colors flex items-center gap-1"
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
            <span>Recent Support Activity</span>
            <span className="w-2 h-2 rounded-full bg-[#5d750f]"></span>
          </h2>
        </div>
        <ActivityFeed tips={recentTips} />
      </section>

      {/* Value Proposition Cards */}
      <section className="bg-[#0e141d] border border-[#1b2738] rounded-3xl p-8 space-y-6">
        <h3 className="text-lg font-bold text-white">Why Micro-Support on Stellar?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#121a26] p-5 rounded-2xl border border-[#1d2b3c] space-y-2">
            <h4 className="font-bold text-sm text-white">Zero Friction Tipping</h4>
            <p className="text-xs text-[#8ca0b8] leading-relaxed">
              Don't ask people for a big donation. Let them support what they value with a tiny payment as small as $0.05.
            </p>
          </div>

          <div className="bg-[#121a26] p-5 rounded-2xl border border-[#1d2b3c] space-y-2">
            <h4 className="font-bold text-sm text-white">Stellar Infrastructure</h4>
            <p className="text-xs text-[#8ca0b8] leading-relaxed">
              Stellar provides payment finality in ~5 seconds with sub-cent fees, making small-value transactions truly practical.
            </p>
          </div>

          <div className="bg-[#121a26] p-5 rounded-2xl border border-[#1d2b3c] space-y-2">
            <h4 className="font-bold text-sm text-white">Soroban Verified</h4>
            <p className="text-xs text-[#8ca0b8] leading-relaxed">
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
        />
      )}
    </div>
  );
}
