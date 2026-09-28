import { CalendarDays, Clock, MapPin } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ZoneBadge } from "@/components/ui/ZoneBadge";
import type { Room, Seat } from "@/types";

export function ReservationPanel({ room, seat }: { room: Room; seat?: Seat | null }) {
  if (!seat) {
    return (
      <aside className="rounded-lg border border-[#e5e2dc] bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Select an available seat</h3>
        <p className="mt-2 text-sm leading-6 text-[#777777]">
          녹색 좌석을 선택하면 좌석 정보와 예약 버튼이 표시됩니다.
        </p>
      </aside>
    );
  }

  return (
    <aside className="rounded-lg border border-[#e5e2dc] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#777777]">Selected Seat</p>
          <h3 className="mt-1 text-3xl font-semibold">{seat.label}</h3>
        </div>
        <ZoneBadge zone={room.zone} />
      </div>
      <div className="space-y-4 border-y border-[#e5e2dc] py-5 text-sm">
        <p className="flex items-center gap-2"><MapPin size={16} /> {room.name}</p>
        <p className="flex items-center gap-2"><CalendarDays size={16} /> Today</p>
        <p className="flex items-center gap-2"><Clock size={16} /> 15:00-24:00</p>
      </div>
      <p className="mt-5 text-sm font-semibold text-[#43624c]">Available</p>
      <LinkButton href={`/reservation?room=${room.id}&seat=${seat.label}`} className="mt-5 w-full">
        Reserve Seat
      </LinkButton>
    </aside>
  );
}
