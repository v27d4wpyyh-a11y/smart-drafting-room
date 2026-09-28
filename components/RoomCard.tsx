import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ZoneBadge } from "@/components/ui/ZoneBadge";
import type { Room } from "@/types";

export function RoomCard({ room }: { room: Room }) {
  const usage = Math.round(((room.total - room.available) / room.total) * 100);
  return (
    <article className="overflow-hidden rounded-lg border border-[#e5e2dc] bg-white shadow-sm">
      <div className="architect-grid relative h-52 border-b border-[#e5e2dc] bg-[#efeee9]">
        <div className="absolute inset-8 grid grid-cols-5 gap-3 opacity-80">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="rounded-sm border border-[#cfcfc9] bg-white/75" />
          ))}
        </div>
        <div className="absolute left-5 top-5">
          <ZoneBadge zone={room.zone} />
        </div>
      </div>
      <div className="space-y-5 p-6">
        <div>
          <p className="text-sm text-[#777777]">{room.name}</p>
          <h2 className="mt-1 text-2xl font-semibold">{room.zone}</h2>
        </div>
        <div className="space-y-2 text-sm">
          <p>{room.description}</p>
          <p className="text-[#777777]">{room.rules}</p>
        </div>
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span>{room.available} / {room.total} 좌석 이용 가능</span>
            <span className="text-[#777777]">Reservation Status</span>
          </div>
          <div className="h-2 rounded-sm bg-[#ece9e2]">
            <div className="h-2 rounded-sm bg-[#222220]" style={{ width: `${usage}%` }} />
          </div>
        </div>
        <LinkButton href={`/rooms/${room.id}`} variant="secondary" className="w-full justify-between">
          View Room <ArrowRight size={16} />
        </LinkButton>
      </div>
    </article>
  );
}
