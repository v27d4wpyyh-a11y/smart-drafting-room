"use client";

import { useEffect, useRef, useState } from "react";
import { Armchair, Maximize2, Plug, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Outlet, Seat } from "@/types";

const FLOOR_PLAN_WIDTH = 820;
const EXPANDED_FLOOR_PLAN_WIDTH = 980;

const statusClass = {
  available: "border-[#6d9678] bg-[#e8f1ea] text-[#355b3f] hover:bg-[#dceade]",
  reserved: "border-[#c88378] bg-[#f4e4e1] text-[#8a4138] cursor-not-allowed",
  unavailable: "border-[#cfcfc9] bg-[#ecece8] text-[#8a8a84] cursor-not-allowed"
};

const unavailableReason = "시설 점검 중인 좌석입니다.";

export function SeatMap({
  seats,
  outlets = [],
  selectedSeat,
  selectedOutlet,
  onSelect,
  onSelectOutlet
}: {
  seats: Seat[];
  outlets?: Outlet[];
  selectedSeat?: Seat | null;
  selectedOutlet?: Outlet | null;
  onSelect: (seat: Seat) => void;
  onSelectOutlet?: (outlet: Outlet) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const rows = ["A", "B", "C", "D", "E", "F"];
  const seatsByLabel = new Map(seats.map((seat) => [seat.label, seat]));

  return (
    <div className="min-w-0 rounded-lg border border-[#e5e2dc] bg-white p-4 shadow-sm lg:p-6">
      <div className="mb-5 flex flex-col gap-3 border-b border-[#e5e2dc] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-sm font-semibold">Reservation Status</span>
          <span className="ml-3 text-xs text-[#777777]">2D Digital Twin View</span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="focus-ring inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#d8d5cf] bg-white px-3 text-sm font-semibold text-[#1f1f1f] transition hover:border-[#222220] sm:w-auto"
        >
          <Maximize2 size={15} />
          배치도 크게 보기
        </button>
      </div>

      <div className="overflow-hidden rounded-md border border-[#e5e2dc] bg-[#f5f4ef] p-3">
        <ScaledFloorPlan rows={rows} seatsByLabel={seatsByLabel} outlets={outlets} selectedSeat={selectedSeat} selectedOutlet={selectedOutlet} onSelect={onSelect} onSelectOutlet={onSelectOutlet} />
      </div>

      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/60 p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="좌석 배치도 크게 보기">
          <div className="flex h-full flex-col rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#e5e2dc] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[#222220]">좌석 배치도</p>
                <p className="text-xs text-[#777777]">확대 보기에서도 좌석을 선택할 수 있습니다.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#d8d5cf] bg-white text-[#1f1f1f]"
                aria-label="닫기"
              >
                <X size={18} />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto bg-[#f5f4ef] p-4">
              <FloorPlan rows={rows} seatsByLabel={seatsByLabel} outlets={outlets} selectedSeat={selectedSeat} selectedOutlet={selectedOutlet} onSelect={onSelect} onSelectOutlet={onSelectOutlet} expanded />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScaledFloorPlan({
  rows,
  seatsByLabel,
  outlets,
  selectedSeat,
  selectedOutlet,
  onSelect,
  onSelectOutlet
}: {
  rows: string[];
  seatsByLabel: Map<string, Seat>;
  outlets: Outlet[];
  selectedSeat?: Seat | null;
  selectedOutlet?: Outlet | null;
  onSelect: (seat: Seat) => void;
  onSelectOutlet?: (outlet: Outlet) => void;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateSize = () => {
      const frameWidth = frameRef.current?.clientWidth ?? FLOOR_PLAN_WIDTH;
      const planHeight = planRef.current?.offsetHeight ?? 0;
      const nextScale = frameWidth / FLOOR_PLAN_WIDTH;

      setScale(nextScale);
      setHeight(planHeight ? planHeight * nextScale : null);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    if (frameRef.current) observer.observe(frameRef.current);
    if (planRef.current) observer.observe(planRef.current);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <div ref={frameRef} className="w-full min-w-0 overflow-hidden">
      <div style={{ height: height ?? undefined }}>
        <div
          ref={planRef}
          style={{
            width: FLOOR_PLAN_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: "top left"
          }}
        >
          <FloorPlan rows={rows} seatsByLabel={seatsByLabel} outlets={outlets} selectedSeat={selectedSeat} selectedOutlet={selectedOutlet} onSelect={onSelect} onSelectOutlet={onSelectOutlet} />
        </div>
      </div>
    </div>
  );
}

function FloorPlan({
  rows,
  seatsByLabel,
  outlets,
  selectedSeat,
  selectedOutlet,
  onSelect,
  onSelectOutlet,
  expanded = false
}: {
  rows: string[];
  seatsByLabel: Map<string, Seat>;
  outlets: Outlet[];
  selectedSeat?: Seat | null;
  selectedOutlet?: Outlet | null;
  onSelect: (seat: Seat) => void;
  onSelectOutlet?: (outlet: Outlet) => void;
  expanded?: boolean;
}) {
  const outletsByPosition = new Map(outlets.map((outlet) => [`${outlet.zone}-${outlet.side}`, outlet]));

  return (
    <div
      className="relative rounded-sm border border-[#d8d5cf] bg-[#fbfaf7] p-5"
      style={{ width: expanded ? EXPANDED_FLOOR_PLAN_WIDTH : FLOOR_PLAN_WIDTH }}
    >
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
        <div className="pointer-events-none absolute right-0 top-0 h-[192px] w-5 rounded-l-sm border border-[#cfd8dd] bg-[#eaf1f4] text-center text-[9px] font-semibold leading-5 text-[#6c7d86] [writing-mode:vertical-rl]">
          Window A-C
        </div>
        <div className="pointer-events-none absolute right-0 top-[238px] h-[192px] w-5 rounded-l-sm border border-[#cfd8dd] bg-[#eaf1f4] text-center text-[9px] font-semibold leading-5 text-[#6c7d86] [writing-mode:vertical-rl]">
          Window D-F
        </div>
        {rows.map((row, rowIndex) => {
          const rowSeats = [1, 2, 3, 4, 5].map((number) => seatsByLabel.get(`${row}-${String(number).padStart(2, "0")}`));
          return (
            <div key={row}>
              <div className="relative grid grid-cols-[34px_2fr_46px_1fr_46px_2fr_56px] items-center gap-0">
                <div aria-hidden="true" />
                <DeskGroup seats={rowSeats.slice(0, 2)} selectedSeat={selectedSeat} onSelect={onSelect} />
                <Aisle />
                <DeskGroup seats={rowSeats.slice(2, 3)} selectedSeat={selectedSeat} onSelect={onSelect} single />
                <Aisle />
                <DeskGroup seats={rowSeats.slice(3, 5)} selectedSeat={selectedSeat} onSelect={onSelect} />
                <div />
              </div>
              {[0, 2, 4].includes(rowIndex) && (
                <OutletLine
                  zone={rowIndex === 0 ? "A-B" : rowIndex === 2 ? "C-D" : "E-F"}
                  outletsByPosition={outletsByPosition}
                  selectedOutlet={selectedOutlet}
                  onSelectOutlet={onSelectOutlet}
                />
              )}
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
  );
}

function Aisle() {
  return <div className="h-12 border-x border-dashed border-[#ddd7cf] bg-white/35 text-center text-[10px] leading-12 text-[#aaa39a]">aisle</div>;
}

function OutletLine({
  zone,
  outletsByPosition,
  selectedOutlet,
  onSelectOutlet
}: {
  zone: Outlet["zone"];
  outletsByPosition: Map<string, Outlet>;
  selectedOutlet?: Outlet | null;
  onSelectOutlet?: (outlet: Outlet) => void;
}) {
  const leftOutlet = outletsByPosition.get(`${zone}-좌측`);
  const rightOutlet = outletsByPosition.get(`${zone}-우측`);

  return (
    <div className="grid grid-cols-[34px_2fr_46px_1fr_46px_2fr_56px] items-center py-1">
      <OutletMarker outlet={leftOutlet} selected={selectedOutlet?.id === leftOutlet?.id} onSelectOutlet={onSelectOutlet} />
      <div className="col-span-5 h-px border-t border-dashed border-[#ded8cf]" />
      <OutletMarker outlet={rightOutlet} selected={selectedOutlet?.id === rightOutlet?.id} onSelectOutlet={onSelectOutlet} align="right" />
    </div>
  );
}

function OutletMarker({
  outlet,
  selected,
  onSelectOutlet,
  align = "left"
}: {
  outlet?: Outlet;
  selected?: boolean;
  onSelectOutlet?: (outlet: Outlet) => void;
  align?: "left" | "right";
}) {
  if (!outlet) {
    return <div />;
  }

  const isFaulty = outlet.status === "faulty";
  const className = cn(
    "focus-ring flex h-6 w-6 items-center justify-center rounded-sm border text-[#6e6863] transition",
    isFaulty
      ? "border-[#c79a2b] bg-[#fff1bf] text-[#8a5d00] hover:bg-[#ffe58c]"
      : "border-[#cfc8bd] bg-white hover:border-[#8f1827] hover:text-[#8f1827]",
    selected && "ring-2 ring-[#222220] ring-offset-1"
  );
  const title = isFaulty ? `${outlet.label}: 고장 신고 대상` : `${outlet.label}: 고장 신고하기`;
  const content = <Plug size={13} />;

  return (
    <div className={cn("flex items-center", align === "right" ? "justify-start pl-2" : "justify-start")}>
      {onSelectOutlet ? (
        <button type="button" className={className} title={title} aria-label={title} onClick={() => onSelectOutlet(outlet)}>
          {content}
        </button>
      ) : (
        <a className={className} title={title} aria-label={title} href={`/report?room=${outlet.roomId}&location=${outlet.id}`}>
          {content}
        </a>
      )}
    </div>
  );
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
    <div className={cn("grid overflow-visible rounded-sm border border-[#c9c2b8] bg-[#ede7dd]", single ? "grid-cols-1" : "grid-cols-2")}>
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
    <div className="group relative">
      <button
        type="button"
        disabled={seat.status !== "available"}
        onClick={() => onSelect(seat)}
        className={cn(
          "focus-ring flex h-14 w-full flex-col items-center justify-center gap-1 border-0 text-xs font-semibold transition",
          connected && rightDivider && "border-r border-[#c9c2b8]",
          statusClass[seat.status],
          selected && "relative z-10 ring-2 ring-[#222220] ring-inset"
        )}
        aria-label={`${seat.label} ${seat.status}`}
        title={seat.status === "unavailable" ? unavailableReason : undefined}
      >
        <Armchair size={15} />
        {seat.label}
      </button>
      {seat.status === "unavailable" && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-40 -translate-x-1/2 rounded-sm bg-[#222220] px-2.5 py-1.5 text-center text-[10px] font-semibold leading-4 text-white opacity-0 shadow-md transition group-hover:opacity-100">
          {unavailableReason}
        </div>
      )}
    </div>
  );
}
