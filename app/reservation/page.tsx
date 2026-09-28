"use client";

import { Suspense } from "react";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Check, Clock, MapPin, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ReservationStepper } from "@/components/reservation/ReservationStepper";
import { ZoneBadge } from "@/components/ui/ZoneBadge";
import { rooms, seats } from "@/data/mockData";

const startHours = [15, 16, 17, 18, 19, 20, 21, 22, 23];
const durations = [1, 2, 3, 4];

function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

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
  const [startHour, setStartHour] = useState(15);
  const [duration, setDuration] = useState(1);
  const roomId = searchParams.get("room") ?? "1";
  const seatId = searchParams.get("seat") ?? "A-01";
  const room = rooms.find((item) => item.id === roomId) ?? rooms[0];
  const availableSeats = useMemo(() => seats.filter((seat) => seat.roomId === room.id && seat.status === "available"), [room.id]);
  const seat = availableSeats.find((item) => item.label === seatId) ?? availableSeats[0];
  const maxDuration = Math.min(4, 24 - startHour);
  const selectedDuration = Math.min(duration, maxDuration);
  const selectedTime = `${formatHour(startHour)}-${formatHour(startHour + selectedDuration)}`;

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
            <p className="flex items-center gap-2"><CalendarDays size={16} /> 1-4시간 연속 예약</p>
            <p className="flex items-center gap-2"><Clock size={16} /> Reservation Status 기반</p>
          </div>
          <div className="mt-6 rounded-md border border-[#e5e2dc] bg-[#f7f7f5] p-4">
            <p className="text-xs font-semibold uppercase text-[#777777]">Selected Time</p>
            <p className="mt-2 text-xl font-semibold">{selectedTime}</p>
            <p className="mt-1 text-sm text-[#777777]">{selectedDuration}시간 이용</p>
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
              <p className="mb-3 text-sm font-semibold">시작 시간</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {startHours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => {
                      setStartHour(hour);
                      setDuration((current) => Math.min(current, 24 - hour, 4));
                    }}
                    className={`focus-ring flex h-14 items-center justify-between rounded-md border px-4 text-left text-sm font-semibold ${startHour === hour ? "border-[#222220] bg-[#222220] text-white" : "border-[#d8d5cf] bg-[#f7f7f5]"}`}
                  >
                    {formatHour(hour)}
                    {startHour === hour && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold">이용 시간 길이</p>
              <div className="grid gap-3 sm:grid-cols-4">
                {durations.map((item) => {
                  const disabled = item > maxDuration;
                  return (
                    <button
                      key={item}
                      disabled={disabled}
                      onClick={() => setDuration(item)}
                      className={`focus-ring flex h-14 items-center justify-between rounded-md border px-4 text-left text-sm font-semibold transition ${selectedDuration === item && !disabled ? "border-[#222220] bg-[#222220] text-white" : "border-[#d8d5cf] bg-[#f7f7f5]"} ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                    >
                      {item}시간
                      {selectedDuration === item && !disabled && <Check size={16} />}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-sm text-[#777777]">
                최대 4시간까지 연속 예약할 수 있습니다. 4시간 이후에는 책상 QR을 스캔해 재예약할 수 있습니다.
              </p>
            </div>
            <div className="rounded-lg border border-[#e5e2dc] bg-[#f7f7f5] p-4">
              <div className="flex items-start gap-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md border border-[#d8d5cf] bg-white">
                  <QrCode size={28} />
                </div>
                <div>
                  <p className="font-semibold">책상 QR 재예약</p>
                  <p className="mt-1 text-sm leading-6 text-[#777777]">
                    이용 종료 후 같은 좌석을 계속 사용하려면 책상에 부착된 QR을 스캔해 새로운 시간대를 다시 예약합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={() => router.push(`/reservation/complete?room=${room.id}&seat=${seat.label}&date=${date}&time=${selectedTime}`)}>
              Confirm Reservation
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
