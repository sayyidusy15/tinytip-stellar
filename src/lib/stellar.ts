import { rpc } from "@stellar/stellar-sdk";
import {
  isAllowed as freighterIsAllowed,
  setAllowed as freighterSetAllowed,
  getAddress as freighterGetAddress,
  signTransaction as freighterSignTransaction,
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

// Check Freighter Connection
export async function connectFreighter(): Promise<string | null> {
  try {
    const allowed = await freighterIsAllowed();
    if (!allowed) {
      const isOk = await freighterSetAllowed();
      if (!isOk) return null;
    }
    const info = await freighterGetAddress();
    if (typeof info === "string") return info;
    return info?.address || null;
  } catch (err) {
    console.error("Freighter connection error:", err);
    return null;
  }
}
