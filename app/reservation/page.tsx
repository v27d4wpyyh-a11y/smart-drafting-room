"use client";

import { Suspense } from "react";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Check, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ReservationStepper } from "@/components/reservation/ReservationStepper";
import { ZoneBadge } from "@/components/ui/ZoneBadge";
import { rooms, seats } from "@/data/mockData";

const timeOptions = ["08:00-12:00", "12:00-16:00", "16:00-20:00", "20:00-24:00"];

export default function ReservationPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-5xl px-5 py-10">예약 화면을 준비하고 있습니다.</main>}>
      <ReservationContent />
    </Suspense>
  );
}

function ReservationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [date, setDate] = useState("2026-10-14");
  const [time, setTime] = useState("16:00-20:00");
  const roomId = searchParams.get("room") ?? "1";
  const seatId = searchParams.get("seat") ?? "A-12";
  const room = rooms.find((item) => item.id === roomId) ?? rooms[0];
  const availableSeats = useMemo(() => seats.filter((seat) => seat.roomId === room.id && seat.status === "available"), [room.id]);
  const seat = availableSeats.find((item) => item.label === seatId) ?? availableSeats[0];

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <ReservationStepper active={3} />
      <section className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-lg border border-[#e5e2dc] bg-white p-6 shadow-sm">
          <p className="text-sm text-[#777777]">Reservation Summary</p>
          <h1 className="mt-2 text-4xl font-semibold">{seat.label}</h1>
          <div className="mt-4"><ZoneBadge zone={room.zone} /></div>
          <div className="mt-6 space-y-4 text-sm">
            <p className="flex items-center gap-2"><MapPin size={16} /> {room.name}</p>
            <p className="flex items-center gap-2"><CalendarDays size={16} /> Maximum reservation: 4 hours</p>
            <p className="flex items-center gap-2"><Clock size={16} /> Reservation Status 기반</p>
          </div>
        </aside>
        <section className="rounded-lg border border-[#e5e2dc] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Date & Time</h2>
          <div className="mt-6 grid gap-6">
            <label className="grid gap-2 text-sm font-semibold">
              이용 날짜
              <input value={date} onChange={(event) => setDate(event.target.value)} type="date" className="focus-ring h-12 rounded-md border border-[#d8d5cf] bg-[#f7f7f5] px-3 font-normal" />
            </label>
            <div>
              <p className="mb-3 text-sm font-semibold">이용 시간</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {timeOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setTime(option)}
                    className={`focus-ring flex h-14 items-center justify-between rounded-md border px-4 text-left text-sm font-semibold ${time === option ? "border-[#222220] bg-[#222220] text-white" : "border-[#d8d5cf] bg-[#f7f7f5]"}`}
                  >
                    {option}
                    {time === option && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={() => router.push(`/reservation/complete?room=${room.id}&seat=${seat.label}&date=${date}&time=${time}`)}>
              Confirm Reservation
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
