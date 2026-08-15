"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  connectFreighterWallet,
  saveManualAddress,
  isValidStellarAddress,
  getActiveWalletAddress,
  disconnectWallet,
  shortenAddress,
} from "@/lib/stellar";

export default function ConnectPage() {
  const router = useRouter();
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualAddress, setManualAddress] = useState("");
  const [addressError, setAddressError] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [activeAddress, setActiveAddress] = useState<string | null>(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  useEffect(() => {
    const { address, isViewOnly } = getActiveWalletAddress();
    if (address) {
      setActiveAddress(address);
      setIsViewOnly(isViewOnly);
    }
  }, []);

  const handleConnectFreighter = async () => {
    setConnecting(true);
    setAddressError(null);

    const res = await connectFreighterWallet();

    if (!res.isInstalled) {
      // Extension not installed, open Freighter website
      window.open("https://www.freighter.app/", "_blank", "noopener,noreferrer");
      setAddressError("Freighter extension not found. Redirecting to freighter.app to install...");
      setConnecting(false);
      return;
    }

    if (res.success && res.address) {
      setActiveAddress(res.address);
      setIsViewOnly(false);
      router.push("/dashboard");
    } else {
      setAddressError("Could not connect to Freighter. Please unlock your extension.");
    }
    setConnecting(false);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = manualAddress.trim();

    if (!isValidStellarAddress(trimmed)) {
      setAddressError("Invalid Stellar address (must start with G...).");
      return;
    }

    setAddressError(null);
    saveManualAddress(trimmed);
    setActiveAddress(trimmed);
    setIsViewOnly(true);
    router.push("/dashboard");
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setActiveAddress(null);
    setIsViewOnly(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-lg bg-[#0c1117] border border-[#1b2636] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-7 relative">
        {/* Top Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Connect your wallet
            </h1>
            <Link
              href="/"
              className="text-zinc-500 hover:text-white text-xs font-semibold px-3 py-1 rounded-full bg-[#131b26] border border-[#1e2a3b] transition-colors"
            >
              ✕ Close
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-[#8c9cb0] leading-relaxed">
            Connect your Stellar wallet to start routing your income automatically. You always retain full control of your funds.
          </p>
        </div>

        {/* Connected State Banner */}
        {activeAddress ? (
          <div className="bg-[#121c27] border border-[#1f2e42] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8c9cb0]">Connected Wallet</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${isViewOnly ? "bg-amber-500/10 text-amber-400 border border-amber-500/30" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"}`}>
                {isViewOnly ? "View-Only Mode" : "Freighter Active"}
              </span>
            </div>
            <div className="font-mono text-sm text-white font-bold break-all">
              {activeAddress}
            </div>
            <div className="flex gap-3 pt-1">
              <Link
                href="/dashboard"
                className="olive-button flex-1 text-center py-2.5 text-xs"
              >
                Go to Dashboard →
              </Link>
              <button
                onClick={handleDisconnect}
                className="secondary-pill-button px-4 py-2.5 text-xs text-rose-400 hover:text-rose-300"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          /* Connect Wallet Options */
          <div className="space-y-4">
            {/* Primary Connect Button */}
            <div>
              <button
                onClick={handleConnectFreighter}
                disabled={connecting}
                className="olive-button w-full py-4 text-sm flex items-center justify-center gap-2 text-white shadow-lg active:scale-95"
              >
                {connecting ? (
                  <span>Connecting Wallet...</span>
                ) : (
                  <>
                    <span>Connect Wallet</span>
                    <span className="text-base font-bold">→</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-[#718298] text-center mt-2 font-medium">
                Freighter · Albedo · xBull supported
              </p>
            </div>

            {/* Manual Address Toggle / Form */}
            {!showManualInput ? (
              <button
                onClick={() => setShowManualInput(true)}
                className="secondary-pill-button w-full py-3.5 text-xs flex items-center justify-center gap-2"
              >
                <span>🔑</span>
                <span>Enter address manually (view-only)</span>
              </button>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-3 pt-2">
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => {
                    setManualAddress(e.target.value);
                    setAddressError(null);
                  }}
                  placeholder="G... Stellar public address"
                  className="input-field w-full px-4 py-3 text-xs font-mono placeholder-[#58687d]"
                />

                <button
                  type="submit"
                  className="secondary-pill-button w-full py-3.5 text-xs flex items-center justify-center gap-2 text-white bg-[#1a2533] border-[#293b52] hover:bg-[#212f42]"
                >
                  <span>Use this address (view mode)</span>
                  <span>→</span>
                </button>

                {addressError && (
                  <div className="p-3.5 rounded-2xl bg-[#2a1114] border border-[#5c1a20] text-rose-400 text-xs text-center font-medium">
                    {addressError}
                  </div>
                )}
              </form>
            )}
          </div>
        )}

        {/* Ecosystem Logos Footer */}
        <div className="pt-6 border-t border-[#182333] space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#5c6e85] uppercase block">
            Supported Ecosystem
          </span>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[#8697ac]">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Stellar</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span>◆ Soroban</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span>settle</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span>🚀 Freighter</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span>Albedo</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <span>USDC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
