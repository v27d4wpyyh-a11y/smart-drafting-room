import { ArrowRight, BarChart3, ClipboardList } from "lucide-react";
import { RoomCard } from "@/components/RoomCard";
import { LinkButton } from "@/components/ui/Button";
import { rooms } from "@/data/mockData";

export default function Home() {
  return (
    <main>
      <section className="architect-grid border-b border-[#e5e2dc]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase text-[#777777]">Digital Twin-based Facility Management</p>
            <h1 className="max-w-4xl text-6xl font-semibold leading-[0.96] tracking-normal md:text-8xl">
              RIGHT SPACE<br />FOR THE RIGHT ACTIVITY.
            </h1>
            <p className="mt-8 text-xl text-[#555555]">필요할 때 자유롭게, 이용할 때는 체계적으로.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/rooms/1">Choose Quiet Zone <ArrowRight size={16} /></LinkButton>
              <LinkButton href="/admin" variant="secondary">View FM Dashboard <BarChart3 size={16} /></LinkButton>
            </div>
          </div>
          <div className="rounded-lg border border-[#e5e2dc] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <ClipboardList size={20} />
              <h2 className="text-xl font-semibold">Prototype Flow</h2>
            </div>
            {["Student Activity", "Space Selection", "Reservation", "Data Collection", "FM Analysis", "Space Management"].map((item, index) => (
              <div key={item} className="flex items-center gap-4 border-t border-[#e5e2dc] py-4 first:border-t-0">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-[#f0eee8] text-sm font-semibold">{index + 1}</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">Select by Activity</h2>
          <p className="mt-2 text-[#777777]">현재 운영 방식이 아니라 실제 활동 패턴에 맞춰 공간을 선택합니다.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
        </div>
      </section>
    </main>
  );
}
