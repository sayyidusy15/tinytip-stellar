import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e2e8f0] bg-white py-8 px-4 sm:px-8 text-xs text-[#94a3b8]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span className="font-bold text-[#1a202c]">TinyTip</span>
          <span>— Micro-support powered by</span>
          <span className="px-2 py-0.5 rounded bg-[#f0fdf0] border border-[#d4ecd4] text-[#5d750f] font-semibold">
            Stellar Soroban
          </span>
        </div>

        <div className="flex items-center gap-6 text-[#64748b]">
          <Link href="/explore" className="hover:text-[#1a202c] transition-colors">
            Explore
          </Link>
          <Link href="/create-profile" className="hover:text-[#1a202c] transition-colors">
            Join as Creator
          </Link>

          <a
            href="https://stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5d750f] transition-colors flex items-center gap-1"
          >
            Stellar Network ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
