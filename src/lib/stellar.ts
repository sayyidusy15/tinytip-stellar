import { rpc } from "@stellar/stellar-sdk";
import {
  isAllowed as freighterIsAllowed,
  setAllowed as freighterSetAllowed,
  getAddress as freighterGetAddress,
  isConnected as freighterIsConnected,
} from "@stellar/freighter-api";

export const STELLAR_NETWORK = "testnet" as const;

export let CONTRACT_ID =
  "CA54QDAYDLAUENAJYIELIYFFTPC7OAXOVNL5B4DEME3NWOTTTWZ2PSDH";

export function setContractId(id: string) {
  CONTRACT_ID = id;
}

export const RPC_URL = "https://soroban-testnet.stellar.org";
export const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";

export function getServer(): rpc.Server {
  return new rpc.Server(RPC_URL, { allowHttp: true });
}

// Convert XLM amount to Stroops (1 XLM = 10_000_000 Stroops)
export function xlmToStroops(xlm: number): bigint {
  return BigInt(Math.round(xlm * 10_000_000));
}

// Convert Stroops to XLM
export function stroopsToXlm(stroops: bigint | number): number {
  return Number(stroops) / 10_000_000;
}

export function formatXlm(stroops: bigint | number): string {
  const xlm = stroopsToXlm(stroops);
  return `${xlm.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} XLM`;
}

// Compatibility helper
export function formatPrice(price: bigint | number): string {
  return formatXlm(price);
}

export function shortenAddress(address: string): string {
  if (!address || address.length <= 12) return address || "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function isValidStellarAddress(address: string): boolean {
  return typeof address === "string" && address.startsWith("G") && address.length === 56;
}

export interface Creator {
  username: string;
  name: string;
  bio: string;
  wallet: string;
  totalReceived: bigint;
  supporterCount: number;
  tipCount: number;
}

export interface Tip {
  id: bigint;
  donor: string;
  creatorUsername: string;
  amount: bigint;
  message: string;
  timestamp: number;
}

// Check Freighter Connection or trigger install redirect
export async function connectFreighterWallet(): Promise<{ success: boolean; address?: string; isInstalled: boolean }> {
  try {
    const isConnected = await freighterIsConnected();
    if (!isConnected) {
      return { success: false, isInstalled: false };
    }

    const allowed = await freighterIsAllowed();
    if (!allowed) {
      const isOk = await freighterSetAllowed();
      if (!isOk) return { success: false, isInstalled: true };
    }

    const info = await freighterGetAddress();
    const address = typeof info === "string" ? info : info?.address;

    if (address && isValidStellarAddress(address)) {
      if (typeof window !== "undefined") {
        localStorage.setItem("tinytip_wallet", address);
        localStorage.setItem("tinytip_wallet_mode", "freighter");
      }
      return { success: true, address, isInstalled: true };
    }
    return { success: false, isInstalled: true };
  } catch (err) {
    console.error("Freighter connection error:", err);
    return { success: false, isInstalled: false };
  }
}

// Get saved wallet address from localStorage or Freighter
export async function getActiveWalletAddress(): Promise<{ address: string | null; isViewOnly: boolean }> {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("tinytip_wallet");
    const mode = localStorage.getItem("tinytip_wallet_mode");
    if (saved) {
      return { address: saved, isViewOnly: mode === "view_only" };
    }
  }

  // Fallback to checking freighter
  const res = await connectFreighterWallet();
  if (res.success && res.address) {
    return { address: res.address, isViewOnly: false };
  }

  return { address: null, isViewOnly: false };
}

export function saveManualAddress(address: string): boolean {
  if (!isValidStellarAddress(address)) return false;
  if (typeof window !== "undefined") {
    localStorage.setItem("tinytip_wallet", address);
    localStorage.setItem("tinytip_wallet_mode", "view_only");
  }
  return true;
}

export function disconnectWallet() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("tinytip_wallet");
    localStorage.removeItem("tinytip_wallet_mode");
  }
}

// Legacy helper compatibility
export async function connectFreighter(): Promise<string | null> {
  const res = await connectFreighterWallet();
  return res.address || null;
}
