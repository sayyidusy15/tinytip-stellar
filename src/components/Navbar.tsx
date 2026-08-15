"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getActiveWalletAddress, shortenAddress } from "@/lib/stellar";

export default function Navbar() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  useEffect(() => {
    getActiveWalletAddress().then(({ address, isViewOnly }) => {
      if (address) {
        setWalletAddress(address);
        setIsViewOnly(isViewOnly);
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f14]/90 backdrop-blur-md border-b border-[#1b2636] px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#5d750f] flex items-center justify-center text-white font-black text-sm">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-tight">
              Tiny<span className="text-[#7a9a14]">Tip</span>
            </span>
            <span className="text-[10px] text-[#63758a] font-mono tracking-wider">STELLAR TESTNET</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#a3b3c7]">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/explore" className="hover:text-white transition-colors">
            Explore Creators
          </Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/create-profile"
            className="hidden sm:inline-flex px-4 py-2 rounded-full text-xs font-medium text-[#c0cfdf] bg-[#121924] hover:bg-[#182333] border border-[#233347] transition-all"
          >
            + Become Creator
          </Link>

          {walletAddress ? (
            <Link
              href="/connect"
              className="flex items-center gap-2 bg-[#121924] border border-[#233347] px-3.5 py-1.5 rounded-full hover:border-[#374e6b] transition-all"
            >
              <div className={`w-2 h-2 rounded-full ${isViewOnly ? "bg-amber-400" : "bg-emerald-400 animate-pulse"}`} />
              <span className="font-mono text-xs font-semibold text-white">
                {shortenAddress(walletAddress)}
              </span>
              {isViewOnly && <span className="text-[10px] text-amber-400 font-mono">(view)</span>}
            </Link>
          ) : (
            <Link
              href="/connect"
              className="olive-button text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <span>Connect Wallet</span>
              <span>→</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
