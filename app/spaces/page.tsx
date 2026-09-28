import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { rooms } from "@/data/mockData";

export default function SpacesPage() {
  return (
    <main className="min-h-screen bg-[#f7f5f2]">
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8f1827]">Drafting Room Reservation</p>
          <h1 className="mt-3 text-3xl font-bold text-[#241f1d] md:text-4xl">활동 목적에 맞는 제도실 선택</h1>
          <p className="mt-3 text-[#6e6863]">개인 작업과 협업 활동을 분리해 제도실 이용을 더 체계적으로 관리합니다.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {rooms.map((room) => {
            const reserved = room.total - room.available;
            const utilization = Math.round((reserved / room.total) * 100);
            const isQuiet = room.zone === "Quiet Zone";
            const cardTone = isQuiet
              ? "border-[#cbd8ea] bg-[#f2f6fc]"
              : "border-[#ead0d4] bg-[#fff4f5]";
            const accentTone = isQuiet ? "text-[#284f86]" : "text-[#8f1827]";
            const progressTone = isQuiet ? "bg-[#5f7fac]" : "bg-[#b85b68]";
            const availabilityTone = isQuiet
              ? "border-[#dbe5f2] bg-[#f8fbff]"
              : "border-[#efd9dc] bg-[#fffafa]";

            return (
              <article key={room.id} className={`rounded-md border p-6 shadow-sm ${cardTone}`}>
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  <div>
                    <p className={`text-sm font-semibold ${accentTone}`}>{room.name}</p>
                    <h2 className="mt-2 text-2xl font-bold text-[#241f1d]">{room.zone}</h2>
                    <p className="mt-4 text-[#3a3431]">{room.description}</p>
                    <p className="mt-2 text-sm text-[#6e6863]">{room.rules}</p>
                  </div>
                  <div className={`min-w-32 rounded-sm border p-4 text-center ${availabilityTone}`}>
                    <div className={`text-2xl font-bold ${accentTone}`}>{room.available}</div>
                    <div className="text-xs font-medium text-[#6e6863]">좌석 이용 가능</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-[#3a3431]">{room.available} / {room.total} 좌석 이용 가능</span>
                    <span className="text-[#6e6863]">Reservation Status</span>
                  </div>
                  <div className="h-2 bg-white/70">
                    <div className={`h-2 ${progressTone}`} style={{ width: `${utilization}%` }} />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm text-[#6e6863]">
                    <CheckCircle2 size={16} className={accentTone} />
                    발표용 데모 예약 가능
                  </div>
                  <LinkButton href={`/rooms/${room.id}`} variant="secondary" className="rounded-sm border-[#d8d2c9] hover:border-[#8f1827] hover:text-[#8f1827]">
                    제도실 보기 <ArrowRight size={16} />
                  </LinkButton>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
