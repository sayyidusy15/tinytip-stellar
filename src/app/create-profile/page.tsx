"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { connectFreighterWallet, CONTRACT_ID, NETWORK_PASSPHRASE, RPC_URL } from "@/lib/stellar";

export default function CreateProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !name) {
      setErrorMsg("Username and Display Name are required.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const walletRes = await connectFreighterWallet();
      if (!walletRes.success || !walletRes.address) {
        if (!walletRes.isInstalled) {
          window.open("https://www.freighter.app/", "_blank", "noopener,noreferrer");
          setErrorMsg("Freighter extension not found. Opening freighter.app to install...");
        } else {
          setErrorMsg("Please connect your Freighter Wallet extension to register your profile on-chain.");
        }
        setLoading(false);
        return;
      }

      const userAddr = walletRes.address;
      const sdk = await import("@stellar/stellar-sdk");
      const freighter = await import("@stellar/freighter-api");
      const server = new sdk.rpc.Server(RPC_URL, { allowHttp: true });

      const contract = new sdk.Contract(CONTRACT_ID);
      const account = await server.getAccount(userAddr);

      const tx = new sdk.TransactionBuilder(account, {
        fee: "10000",
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(
          contract.call(
            "register_creator",
            sdk.nativeToScVal(username.toLowerCase(), { type: "string" }),
            sdk.nativeToScVal(name, { type: "string" }),
            sdk.nativeToScVal(bio, { type: "string" }),
            sdk.Address.fromString(userAddr).toScVal()
          )
        )
        .setTimeout(30)
        .build();

      const preparedTx = await server.prepareTransaction(tx);
      const signedRes: any = await freighter.signTransaction(preparedTx.toXDR(), {
        networkPassphrase: NETWORK_PASSPHRASE,
      });

      const signedXdr = typeof signedRes === "string" ? signedRes : signedRes?.signedTxXdr || preparedTx.toXDR();

      await server.sendTransaction(sdk.TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE));

      router.push(`/creator/${username.toLowerCase()}`);
    } catch (err: any) {
      console.error("Register profile error:", err);
      router.push(`/creator/${username.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="matte-card p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a202c]">Become a TinyTip Creator</h1>
          <p className="text-xs text-[#64748b] mt-1">
            Register your creator profile on Stellar Soroban to start accepting micro-tips.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[#475569] block mb-1.5">
              Username (URL slug):
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-mono text-[#94a3b8]">
                tinytip.app/creator/
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
                placeholder="ahan"
                required
                className="input-field w-full pl-36 pr-3.5 py-2.5 text-xs placeholder-[#94a3b8] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-[#475569] block mb-1.5">
              Display Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ahan"
              required
              className="input-field w-full px-3.5 py-2.5 text-xs placeholder-[#94a3b8]"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#475569] block mb-1.5">
              Short Bio / What you build:
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Building open source tools and public goods on Stellar..."
              className="input-field w-full px-3.5 py-2.5 text-xs placeholder-[#94a3b8]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="olive-button w-full py-3 text-xs flex items-center justify-center gap-2"
          >
            {loading ? "Registering on Soroban..." : "Register Profile on Stellar →"}
          </button>
        </form>
      </div>
    </div>
  );
}
