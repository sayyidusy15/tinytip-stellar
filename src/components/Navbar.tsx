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
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e2e8f0] px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#5d750f] flex items-center justify-center text-white font-black text-sm">
            T
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-[#1a202c] tracking-tight">
              Tiny<span className="text-[#5d750f]">Tip</span>
            </span>
            <span className="text-[10px] text-[#94a3b8] font-mono tracking-wider">STELLAR TESTNET</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#64748b]">
          <Link href="/" className="hover:text-[#1a202c] transition-colors">
            Home
          </Link>
          <Link href="/explore" className="hover:text-[#1a202c] transition-colors">
            Explore Creators
          </Link>
          <Link href="/dashboard" className="hover:text-[#1a202c] transition-colors">
            Dashboard
          </Link>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/create-profile"
            className="inline-flex px-4 py-2 rounded-full text-xs font-medium text-[#475569] bg-[#f1f5f9] hover:bg-[#e8ecf1] border border-[#e2e8f0] transition-all"
          >
            + Become Creator
          </Link>

          {walletAddress ? (
            <Link
              href="/connect"
              className="flex items-center gap-2 bg-[#f1f5f9] border border-[#e2e8f0] px-3.5 py-1.5 rounded-full hover:border-[#cbd5e1] transition-all"
            >
              <div className={`w-2 h-2 rounded-full ${isViewOnly ? "bg-amber-500" : "bg-emerald-500 animate-pulse"}`} />
              <span className="font-mono text-xs font-semibold text-[#1a202c]">
                {shortenAddress(walletAddress)}
              </span>
              {isViewOnly && <span className="text-[10px] text-amber-600 font-mono">(view)</span>}
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
              className="flex items-center gap-1.5 bg-[#f1f5f9] border border-[#e2e8f0] px-2.5 py-1.5 rounded-full"
            >
              <div className={`w-2 h-2 rounded-full ${isViewOnly ? "bg-amber-500" : "bg-emerald-500 animate-pulse"}`} />
              <span className="font-mono text-[11px] font-semibold text-[#1a202c]">
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
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg bg-[#f1f5f9] border border-[#e2e8f0]"
            aria-label="Toggle menu"
          >
            <span className={`block w-4 h-[1.5px] bg-[#64748b] transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-4 h-[1.5px] bg-[#64748b] transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-[1.5px] bg-[#64748b] transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pb-2 border-t border-[#e2e8f0] pt-4 space-y-1">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-xs font-semibold text-[#64748b] hover:text-[#1a202c] hover:bg-[#f1f5f9] transition-all">
            Home
          </Link>
          <Link href="/explore" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-xs font-semibold text-[#64748b] hover:text-[#1a202c] hover:bg-[#f1f5f9] transition-all">
            Explore Creators
          </Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-xs font-semibold text-[#64748b] hover:text-[#1a202c] hover:bg-[#f1f5f9] transition-all">
            Dashboard
          </Link>
          <Link href="/create-profile" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl text-xs font-semibold text-[#5d750f] hover:bg-[#f1f5f9] transition-all">
            + Become Creator
          </Link>
        </div>
      )}
    </header>
  );
}
