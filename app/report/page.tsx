"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { SeatMap } from "@/components/digital-twin/SeatMap";
import { SeatStatusLegend } from "@/components/digital-twin/SeatStatusLegend";
import { Button } from "@/components/ui/Button";
import { ZoneBadge } from "@/components/ui/ZoneBadge";
import { rooms, seats } from "@/data/mockData";
import type { Seat } from "@/types";

const categories = ["콘센트", "조명", "가구/의자", "냉난방", "쓰레기/청결", "소음", "음식물", "장시간 자리점유", "기타"];

export default function ReportPage() {
  const [roomId, setRoomId] = useState<"1" | "2">("1");
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [category, setCategory] = useState("콘센트");
  const [detail, setDetail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const room = rooms.find((item) => item.id === roomId) ?? rooms[0];
  const roomSeats = useMemo(() => seats.filter((seat) => seat.roomId === roomId), [roomId]);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Issue Report</h1>
        <p className="mt-2 text-[#777777]">공간 위치와 불편사항을 연결해 FM 관리 데이터로 축적합니다.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section>
          <div className="mb-4 flex flex-col justify-between gap-4 rounded-lg border border-[#e5e2dc] bg-white p-4 shadow-sm md:flex-row md:items-center">
            <div className="flex gap-2">
              {rooms.map((item) => (
                <button key={item.id} onClick={() => { setRoomId(item.id); setSelectedSeat(null); }} className={`focus-ring rounded-md border px-4 py-2 text-sm font-semibold ${roomId === item.id ? "border-[#222220] bg-[#222220] text-white" : "border-[#d8d5cf] bg-white"}`}>
                  {item.name}
                </button>
              ))}
            </div>
            <SeatStatusLegend />
          </div>
          <SeatMap seats={roomSeats} selectedSeat={selectedSeat} onSelect={setSelectedSeat} />
        </section>
        <aside className="rounded-lg border border-[#e5e2dc] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-[#777777]">Selected Location</p>
              <h2 className="mt-1 text-2xl font-semibold">{selectedSeat?.label ?? "Area not selected"}</h2>
            </div>
            <ZoneBadge zone={room.zone} />
          </div>
          <label className="grid gap-2 text-sm font-semibold">
            Issue category
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="focus-ring h-12 rounded-md border border-[#d8d5cf] bg-[#f7f7f5] px-3 font-normal">
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label className="mt-5 grid gap-2 text-sm font-semibold">
            상세 내용
            <textarea value={detail} onChange={(event) => setDetail(event.target.value)} rows={6} className="focus-ring resize-none rounded-md border border-[#d8d5cf] bg-[#f7f7f5] p-3 font-normal" placeholder="예: 창가 쪽 콘센트가 충전되지 않습니다." />
          </label>
          <Button className="mt-5 w-full" onClick={() => setSubmitted(true)}><Send size={16} /> 신고하기</Button>
          {submitted && (
            <div className="mt-5 rounded-md border border-[#b9cdbf] bg-[#eef4ef] p-4 text-sm text-[#43624c]">
              신고가 접수되었습니다. FM Dashboard의 Issue Report 데이터로 반영됩니다.
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
