"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { connectFreighter, shortenAddress } from "@/lib/stellar";

export default function Navbar() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check auto-connect on load
    connectFreighter().then((addr) => {
      if (addr) setWalletAddress(addr);
    });
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    const addr = await connectFreighter();
    if (addr) {
      setWalletAddress(addr);
    } else {
      alert("Could not connect to Freighter Wallet. Please install or unlock Freighter extension.");
    }
    setIsConnecting(false);
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav border-b border-zinc-800/80 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-indigo-500 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <span className="text-emerald-400 font-extrabold text-lg">✨</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              Tiny<span className="gradient-text">Tip</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider">STELLAR TESTNET</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link href="/explore" className="hover:text-emerald-400 transition-colors">
            Explore Creators
          </Link>
          <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
            Dashboard
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/create-profile"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 transition-all hover:text-white"
          >
            + Become a Creator
          </Link>

          {walletAddress ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-semibold text-emerald-300">
                {shortenAddress(walletAddress)}
              </span>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="gradient-button text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
            >
              {isConnecting ? (
                <>Connecting...</>
              ) : (
                <>
                  <span>Connect Wallet</span>
                  <span className="text-xs">🚀</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
