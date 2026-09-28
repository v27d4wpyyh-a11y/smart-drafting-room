"use client";

import { Armchair } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Seat } from "@/types";

const statusClass = {
  available: "border-[#6d9678] bg-[#e8f1ea] text-[#355b3f] hover:bg-[#dceade]",
  reserved: "border-[#c88378] bg-[#f4e4e1] text-[#8a4138] cursor-not-allowed",
  unavailable: "border-[#cfcfc9] bg-[#ecece8] text-[#8a8a84] cursor-not-allowed"
};

export function SeatMap({
  seats,
  selectedSeat,
  onSelect
}: {
  seats: Seat[];
  selectedSeat?: Seat | null;
  onSelect: (seat: Seat) => void;
}) {
  const rows = ["A", "B", "C"] as const;
  return (
    <div className="rounded-lg border border-[#e5e2dc] bg-white p-4 shadow-sm lg:p-6">
      <div className="mb-5 flex items-center justify-between border-b border-[#e5e2dc] pb-4">
        <span className="text-sm font-semibold">Reservation Status</span>
        <span className="text-xs text-[#777777]">2D Digital Twin View</span>
      </div>
      <div className="architect-grid rounded-md border border-[#e5e2dc] bg-[#f5f4ef] p-4">
        <div className="mb-4 h-8 rounded-sm border border-[#d8d5cf] bg-white text-center text-xs leading-8 text-[#777777]">
          Window / Presentation Wall
        </div>
        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row} className="grid grid-cols-[24px_1fr] gap-3">
              <div className="pt-3 text-sm font-semibold text-[#777777]">{row}</div>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
                {seats.filter((seat) => seat.row === row).map((seat) => {
                  const isSelected = selectedSeat?.id === seat.id;
                  return (
                    <button
                      key={seat.id}
                      type="button"
                      disabled={seat.status !== "available"}
                      onClick={() => onSelect(seat)}
                      className={cn(
                        "focus-ring flex aspect-[1.05] min-h-14 flex-col items-center justify-center gap-1 rounded-md border text-xs font-semibold transition",
                        statusClass[seat.status],
                        isSelected && "ring-2 ring-[#222220] ring-offset-2"
                      )}
                      aria-label={`${seat.label} ${seat.status}`}
                    >
                      <Armchair size={16} />
                      {seat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-[#777777] sm:grid-cols-4">
          <div className="rounded-sm border border-[#d8d5cf] bg-white p-3 text-center">Entry</div>
          <div className="rounded-sm border border-[#d8d5cf] bg-white p-3 text-center">Storage</div>
          <div className="rounded-sm border border-[#d8d5cf] bg-white p-3 text-center">Sink</div>
          <div className="rounded-sm border border-[#d8d5cf] bg-white p-3 text-center">Print Area</div>
        </div>
      </div>
    </div>
  );
}
