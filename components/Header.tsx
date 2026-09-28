"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className="sticky top-0 z-40 border-b border-[#e2ddd5] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3 font-semibold">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#ded8cf] bg-white">
            <img src="/khu-seal.png" alt="Kyung Hee University seal" className="h-8 w-8 object-contain" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold leading-tight text-[#8f1827] sm:text-base">KYUNG HEE UNIVERSITY</span>
            <span className="block truncate text-xs font-semibold leading-tight text-[#2a2523] sm:text-sm">주거환경학과 제도실 예약 시스템</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
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
