import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-800/80 bg-zinc-950/80 py-8 px-4 sm:px-8 text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-zinc-300">TinyTip</span>
          <span>— Micro-support platform powered by</span>
          <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-semibold">
            Stellar Soroban
          </span>
        </div>

        <div className="flex items-center gap-6 text-zinc-400">
          <Link href="/explore" className="hover:text-white transition-colors">
            Explore
          </Link>
          <Link href="/create-profile" className="hover:text-white transition-colors">
            Join as Creator
          </Link>

          <a
            href="https://stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            Stellar Network ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
