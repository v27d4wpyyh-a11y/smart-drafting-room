"use client";

import { useState } from "react";
import { CalendarDays, Clock, MapPin, X } from "lucide-react";
import { LinkButton, Button } from "@/components/ui/Button";
import { reservations, rooms } from "@/data/mockData";
import type { Reservation } from "@/types";

export default function MyReservationsPage() {
  const [items, setItems] = useState<Reservation[]>(reservations);
  const upcoming = items.filter((item) => item.status === "upcoming");
  const past = items.filter((item) => item.status !== "upcoming");

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-semibold">My Reservations</h1>
          <p className="mt-2 text-[#777777]">예약 현황을 확인하고 필요한 경우 취소할 수 있습니다.</p>
        </div>
        <LinkButton href="/reservation" variant="secondary">New Reservation</LinkButton>
      </div>
      <ReservationList title="Upcoming reservations" items={upcoming} onCancel={(id) => setItems((prev) => prev.map((item) => item.id === id ? { ...item, status: "cancelled" } : item))} />
      <ReservationList title="Past reservations" items={past} />
    </main>
  );
}

function ReservationList({ title, items, onCancel }: { title: string; items: Reservation[]; onCancel?: (id: string) => void }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((reservation) => {
          const room = rooms.find((item) => item.id === reservation.roomId) ?? rooms[0];
          return (
            <article key={reservation.id} className="rounded-lg border border-[#e5e2dc] bg-white p-5 shadow-sm">
              <div className="mb-5 flex justify-between gap-4">
                <div>
                  <p className="text-sm text-[#777777]">{reservation.id}</p>
                  <h3 className="mt-1 text-2xl font-semibold">{reservation.seatId}</h3>
                </div>
                <span className="h-fit rounded-md border border-[#d8d5cf] px-2.5 py-1 text-xs font-semibold uppercase">{reservation.status}</span>
              </div>
              <div className="space-y-3 text-sm text-[#555555]">
                <p className="flex items-center gap-2"><MapPin size={16} /> {room.name} · {reservation.zone}</p>
                <p className="flex items-center gap-2"><CalendarDays size={16} /> {reservation.date}</p>
                <p className="flex items-center gap-2"><Clock size={16} /> {reservation.time}</p>
              </div>
              <div className="mt-5 flex gap-2">
                <LinkButton href={`/rooms/${reservation.roomId}`} variant="secondary" className="flex-1">View Room</LinkButton>
                {onCancel && <Button variant="ghost" onClick={() => onCancel(reservation.id)} className="flex-1"><X size={16} /> Cancel</Button>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
