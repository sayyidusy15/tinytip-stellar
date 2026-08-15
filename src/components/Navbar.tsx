"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getActiveWalletAddress, shortenAddress } from "@/lib/stellar";

export default function Navbar() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const { address, isViewOnly } = getActiveWalletAddress();
    if (address) {
      setWalletAddress(address);
      setIsViewOnly(isViewOnly);
    }
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

        {/* Desktop Navigation Links */}
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

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/create-profile"
            className="inline-flex px-4 py-2 rounded-full text-xs font-medium text-[#c0cfdf] bg-[#121924] hover:bg-[#182333] border border-[#233347] transition-all"
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

        {/* Mobile: Wallet + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {walletAddress ? (
            <Link
              href="/connect"
              className="flex items-center gap-1.5 bg-[#121924] border border-[#233347] px-2.5 py-1.5 rounded-full"
            >
              <div className={`w-2 h-2 rounded-full ${isViewOnly ? "bg-amber-400" : "bg-emerald-400 animate-pulse"}`} />
              <span className="font-mono text-[11px] font-semibold text-white">
                {shortenAddress(walletAddress)}
              </span>
            </Link>
          ) : (
            <Link
              href="/connect"
              className="olive-button text-[11px] px-3 py-1.5 flex items-center gap-1"
            >
              Connect →
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg bg-[#121924] border border-[#233347]"
            aria-label="Toggle menu"
          >
            <span className={`block w-4 h-[1.5px] bg-[#a3b3c7] transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-4 h-[1.5px] bg-[#a3b3c7] transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-[1.5px] bg-[#a3b3c7] transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pb-2 border-t border-[#1b2636] pt-4 space-y-1">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-xs font-semibold text-[#a3b3c7] hover:text-white hover:bg-[#121924] transition-all"
          >
            Home
          </Link>
          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-xs font-semibold text-[#a3b3c7] hover:text-white hover:bg-[#121924] transition-all"
          >
            Explore Creators
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-xs font-semibold text-[#a3b3c7] hover:text-white hover:bg-[#121924] transition-all"
          >
            Dashboard
          </Link>
          <Link
            href="/create-profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-xs font-semibold text-[#7a9a14] hover:bg-[#121924] transition-all"
          >
            + Become Creator
          </Link>
        </div>
      )}
    </header>
  );
}
