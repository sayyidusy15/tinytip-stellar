import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#1b2636] bg-[#080c11] py-8 px-4 sm:px-8 text-xs text-[#6e8096]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">TinyTip</span>
          <span>— Micro-support platform powered by</span>
          <span className="px-2 py-0.5 rounded bg-[#5d750f]/15 border border-[#5d750f]/30 text-[#7a9a14] font-semibold">
            Stellar Soroban
          </span>
        </div>

        <div className="flex items-center gap-6 text-[#8b9cb0]">
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
            className="hover:text-[#7a9a14] transition-colors flex items-center gap-1"
          >
            Stellar Network ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
