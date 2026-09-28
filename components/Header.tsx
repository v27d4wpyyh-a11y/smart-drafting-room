"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/reservation", label: "Reservation" },
  { href: "/report", label: "Report" },
  { href: "/notice", label: "Notice" },
  { href: "/admin", label: "FM Dashboard" }
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <header className="sticky top-0 z-40 border-b border-[#e2ddd5] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-4">
            <img src="/khu-seal.png" alt="Kyung Hee University seal" className="h-28 w-28 shrink-0 object-contain md:h-40 md:w-40" />
            <div className="min-w-0">
              <div className="text-sm font-bold leading-tight tracking-wide text-[#8f1827]">KYUNG HEE UNIVERSITY</div>
              <div className="text-sm font-semibold text-[#2a2523]">경희대학교</div>
              <div className="mt-1 text-xs font-medium text-[#6e6863]">주거환경학과 제도실 예약 시스템</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-sm border-b-2 border-transparent px-3 py-2 text-sm font-medium text-[#6e6863] transition hover:text-[#8f1827]",
                  pathname === item.href && "border-[#8f1827] text-[#8f1827]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e2dc] bg-[#f7f7f5]/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-[#222220] text-white">
            <Building2 size={18} />
          </span>
          <span>Smart Drafting Room</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("rounded-md px-3 py-2 text-sm text-[#777777] transition hover:bg-white hover:text-[#1f1f1f]", pathname === item.href && "bg-white text-[#1f1f1f] shadow-sm")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
