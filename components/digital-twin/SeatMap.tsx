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
  const rows = ["A", "B", "C", "D", "E", "F"];
  const seatsByLabel = new Map(seats.map((seat) => [seat.label, seat]));

  return (
    <div className="rounded-lg border border-[#e5e2dc] bg-white p-4 shadow-sm lg:p-6">
      <div className="mb-5 flex items-center justify-between border-b border-[#e5e2dc] pb-4">
        <span className="text-sm font-semibold">Reservation Status</span>
        <span className="text-xs text-[#777777]">2D Digital Twin View</span>
      </div>

      <div className="overflow-x-auto rounded-md border border-[#e5e2dc] bg-[#f5f4ef] p-3">
        <div className="relative min-w-[820px] rounded-sm border border-[#d8d5cf] bg-[#fbfaf7] p-5">
          <div className="absolute left-0 top-20 h-16 -translate-x-1/2 rounded-r-sm border border-[#d8d5cf] bg-white px-2 py-1 text-[10px] font-semibold text-[#777777] [writing-mode:vertical-rl]">
            Front Door
          </div>
          <div className="mb-5 rounded-sm border border-[#9a9a94] bg-[#3c3c38] py-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white">
            Large Front Blackboard
          </div>

          <div className="mb-7 grid grid-cols-[1fr_170px_120px_1fr] items-end gap-4 px-10">
            <div />
            <div className="rounded-sm border border-[#d1cbc1] bg-[#f2eee7] px-3 py-3 text-center text-xs font-semibold text-[#66615c]">
              크리틱 책상
            </div>
            <div className="rounded-sm border border-[#d1cbc1] bg-white px-3 py-3 text-center text-xs text-[#66615c]">
              <div className="font-semibold text-[#33302d]">Podium / PC</div>
              <div className="mt-1 text-[10px]">교탁 · 컴퓨터</div>
            </div>
            <div />
          </div>

          <div className="mb-4 h-10 rounded-sm border border-dashed border-[#d8d5cf] bg-white/45" />

          <div className="relative space-y-3">
            <div className="pointer-events-none absolute right-0 top-0 h-[192px] w-9 rounded-l-sm border border-[#cfd8dd] bg-[#eaf1f4] text-center text-[10px] font-semibold leading-9 text-[#6c7d86] [writing-mode:vertical-rl]">
              Window A-C
            </div>
            <div className="pointer-events-none absolute right-0 top-[204px] h-[192px] w-9 rounded-l-sm border border-[#cfd8dd] bg-[#eaf1f4] text-center text-[10px] font-semibold leading-9 text-[#6c7d86] [writing-mode:vertical-rl]">
              Window D-F
            </div>
            {rows.map((row, rowIndex) => {
              const rowSeats = [1, 2, 3, 4, 5].map((number) => seatsByLabel.get(`${row}-${String(number).padStart(2, "0")}`));
              return (
                <div key={row} className="relative grid grid-cols-[34px_2fr_46px_1fr_46px_2fr_48px] items-center gap-0">
                  <div className="text-sm font-semibold text-[#777777]">Row {rowIndex + 1}</div>
                  <DeskGroup seats={rowSeats.slice(0, 2)} selectedSeat={selectedSeat} onSelect={onSelect} />
                  <Aisle />
                  <DeskGroup seats={rowSeats.slice(2, 3)} selectedSeat={selectedSeat} onSelect={onSelect} single />
                  <Aisle />
                  <DeskGroup seats={rowSeats.slice(3, 5)} selectedSeat={selectedSeat} onSelect={onSelect} />
                  <div />
                </div>
              );
            })}
          </div>

          <div className="relative mt-4 h-10 rounded-sm border border-dashed border-[#d8d5cf] bg-white/45">
            <div className="absolute left-0 top-1/2 h-16 -translate-x-1/2 -translate-y-1/2 rounded-r-sm border border-[#d8d5cf] bg-white px-2 py-1 text-[10px] font-semibold text-[#777777] [writing-mode:vertical-rl]">
              Back Door
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[1.2fr_1fr] gap-3 text-xs text-[#777777]">
            <div className="rounded-sm border border-[#d8d5cf] bg-white p-3 text-center font-semibold">Rear Bookshelf / Lockers</div>
            <div className="rounded-sm border border-[#d8d5cf] bg-white p-3 text-center font-semibold">Rear Drafting-board Storage</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Aisle() {
  return <div className="h-12 border-x border-dashed border-[#ddd7cf] bg-white/35 text-center text-[10px] leading-12 text-[#aaa39a]">aisle</div>;
}

function DeskGroup({
  seats,
  selectedSeat,
  onSelect,
  single = false
}: {
  seats: Array<Seat | undefined>;
  selectedSeat?: Seat | null;
  onSelect: (seat: Seat) => void;
  single?: boolean;
}) {
  return (
    <div className={cn("grid overflow-hidden rounded-sm border border-[#c9c2b8] bg-[#ede7dd]", single ? "grid-cols-1" : "grid-cols-2")}>
      {seats.map((seat, index) => seat ? (
        <SeatButton
          key={seat.id}
          seat={seat}
          selected={selectedSeat?.id === seat.id}
          onSelect={onSelect}
          connected={!single}
          rightDivider={!single && index === 0}
        />
      ) : (
        <div key={index} className="h-14 bg-[#ede7dd]" />
      ))}
    </div>
  );
}

function SeatButton({
  seat,
  selected,
  onSelect,
  connected,
  rightDivider
}: {
  seat: Seat;
  selected: boolean;
  onSelect: (seat: Seat) => void;
  connected: boolean;
  rightDivider: boolean;
}) {
  return (
    <button
      type="button"
      disabled={seat.status !== "available"}
      onClick={() => onSelect(seat)}
      className={cn(
        "focus-ring flex h-14 flex-col items-center justify-center gap-1 border-0 text-xs font-semibold transition",
        connected && rightDivider && "border-r border-[#c9c2b8]",
        statusClass[seat.status],
        selected && "relative z-10 ring-2 ring-[#222220] ring-inset"
      )}
      aria-label={`${seat.label} ${seat.status}`}
    >
      <Armchair size={15} />
      {seat.label}
    </button>
  );
}
