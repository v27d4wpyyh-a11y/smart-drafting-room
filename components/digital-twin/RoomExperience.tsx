"use client";

import { useState } from "react";
import { Box, Grid2X2 } from "lucide-react";
import { DigitalTwinPreview } from "@/components/digital-twin/DigitalTwinPreview";
import { ReservationPanel } from "@/components/reservation/ReservationPanel";
import { SeatMap } from "@/components/digital-twin/SeatMap";
import { SeatStatusLegend } from "@/components/digital-twin/SeatStatusLegend";
import { Button } from "@/components/ui/Button";
import { ZoneBadge } from "@/components/ui/ZoneBadge";
import type { Outlet, Room, Seat } from "@/types";

export function RoomExperience({ room, seats, outlets }: { room: Room; seats: Seat[]; outlets: Outlet[] }) {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [view, setView] = useState<"2d" | "3d">("2d");

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 lg:py-12">
      <section className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <ZoneBadge zone={room.zone} />
          <h1 className="mt-4 text-4xl font-semibold tracking-normal lg:text-5xl">{room.name}</h1>
          <p className="mt-3 max-w-2xl text-[#777777]">{room.description}을 위한 {room.zone}입니다.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 rounded-lg border border-[#e5e2dc] bg-white p-4 text-center shadow-sm">
          <div>
            <div className="text-2xl font-semibold">{room.available}</div>
            <div className="text-xs text-[#777777]">Available</div>
          </div>
          <div>
            <div className="text-2xl font-semibold">{room.total}</div>
            <div className="text-xs text-[#777777]">Total Seats</div>
          </div>
          <div>
            <div className="text-2xl font-semibold">15-24</div>
            <div className="text-xs text-[#777777]">Today</div>
          </div>
        </div>
      </section>

      <div className="mb-5 flex flex-col justify-between gap-4 rounded-lg border border-[#e5e2dc] bg-white p-4 shadow-sm md:flex-row md:items-center">
        <SeatStatusLegend />
        <div className="flex gap-2">
          <Button variant={view === "2d" ? "primary" : "secondary"} onClick={() => setView("2d")}><Grid2X2 size={16} /> 2D View</Button>
          <Button variant={view === "3d" ? "primary" : "secondary"} onClick={() => setView("3d")}><Box size={16} /> 3D View</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {view === "2d" ? (
          <SeatMap seats={seats} outlets={outlets} selectedSeat={selectedSeat} onSelect={setSelectedSeat} />
        ) : (
          <DigitalTwinPreview zone={room.zone} />
        )}
        <ReservationPanel room={room} seat={selectedSeat} />
      </div>
    </main>
  );
}
