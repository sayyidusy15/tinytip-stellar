"use client";

import { useState } from "react";
import CreatorCard from "@/components/CreatorCard";
import TipModal from "@/components/TipModal";
import { Creator } from "@/lib/stellar";

const SAMPLE_CREATORS: Creator[] = [
  {
    username: "ahan",
    name: "Ahan",
    bio: "Open Source Developer building Web3 developer tooling & Stellar contracts.",
    wallet: "GAMCB2RP4WONAMRUQA5DG342TDACC4TYEIHOAO5JD7BN2HL4EK3TCBY2",
    totalReceived: BigInt(874_2000000),
    supporterCount: 342,
    tipCount: 421,
  },
  {
    username: "sarah_ui",
    name: "Sarah Chen",
    bio: "UI/UX Designer crafting beautiful open-source Web3 design systems.",
    wallet: "GA22G44TKSBBH325D2JONN5AES33FDZKB33JZATM6P3R3V3WVMHHE3IH",
    totalReceived: BigInt(452_1000000),
    supporterCount: 189,
    tipCount: 210,
  },
  {
    username: "bandung_dev",
    name: "Bandung Builders",
    bio: "Community of Stellar developers organizing workshops and open-source public goods.",
    wallet: "GD52F3...XLM78",
    totalReceived: BigInt(1250_0000000),
    supporterCount: 512,
    tipCount: 680,
  },
  {
    username: "alex_writer",
    name: "Alex Rivera",
    bio: "Technical writer publishing free deep dives on Soroban smart contract security.",
    wallet: "GBX771...99Z1",
    totalReceived: BigInt(310_5000000),
    supporterCount: 120,
    tipCount: 145,
  },
  {
    username: "crypto_artist",
    name: "Maya Lin",
    bio: "Digital artist making public domain generative art assets.",
    wallet: "GCD442...PPO1",
    totalReceived: BigInt(620_0000000),
    supporterCount: 245,
    tipCount: 310,
  },
];

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const filteredCreators = SAMPLE_CREATORS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#1a202c] tracking-tight">Explore Creators</h1>
        <p className="text-xs text-[#64748b]">
          Discover developers, artists, writers, and public goods creators on Stellar.
        </p>
      </div>

      <div className="relative max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, @username, or keyword..."
          className="input-field w-full px-4 py-3 text-xs placeholder-[#94a3b8]"
        />
        <span className="absolute right-3.5 top-3 text-[#94a3b8] text-sm">🔍</span>
      </div>

      {filteredCreators.length === 0 ? (
        <div className="matte-card p-12 text-center text-[#94a3b8]">
          <p className="text-xs">No creators found matching &quot;{searchTerm}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard
              key={creator.username}
              creator={creator}
              onTipClick={(c) => setSelectedCreator(c)}
            />
          ))}
        </div>
      )}

      {selectedCreator && (
        <TipModal creator={selectedCreator} onClose={() => setSelectedCreator(null)} />
      )}
    </div>
  );
}
