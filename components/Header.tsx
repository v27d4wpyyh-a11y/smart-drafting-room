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
