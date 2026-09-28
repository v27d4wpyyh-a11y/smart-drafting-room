import { cn } from "@/lib/utils";
import type { ZoneType } from "@/types";

export function ZoneBadge({ zone }: { zone: ZoneType }) {
  const quiet = zone === "Quiet Zone";
  return (
    <span className={cn("inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide", quiet ? "border-[#b9cdbf] bg-[#eef4ef] text-[#43624c]" : "border-[#cfc6b0] bg-[#f6f0e3] text-[#725d2c]")}>
      {zone}
    </span>
  );
}
