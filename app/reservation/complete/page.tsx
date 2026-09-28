import { LinkButton } from "@/components/ui/Button";
import { ReservationStepper } from "@/components/reservation/ReservationStepper";
import { rooms } from "@/data/mockData";

export default async function ReservationCompletePage({
  searchParams
}: {
  searchParams: Promise<{ room?: string; seat?: string; date?: string; time?: string }>;
}) {
  const params = await searchParams;
  const room = rooms.find((item) => item.id === (params.room ?? "1")) ?? rooms[0];
  const date = params.date ?? "2026-10-14";
  const formattedDate = new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(date));

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <ReservationStepper active={4} />
      <section className="mt-8 rounded-lg border border-[#e5e2dc] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-md bg-[#e8f1ea] text-2xl text-[#43624c]">✓</div>
        <h1 className="mt-6 text-3xl font-semibold">예약이 완료되었습니다.</h1>
        <div className="mx-auto mt-8 max-w-md divide-y divide-[#e5e2dc] rounded-lg border border-[#e5e2dc] text-left">
          <Info label="제도실" value={`${room.name} (${room.zone.toUpperCase()})`} />
          <Info label="좌석" value={params.seat ?? "A-01"} />
          <Info label="이용 날짜" value={formattedDate} />
          <Info label="이용 시간" value={params.time ?? "15:00-16:00"} />
        </div>
        <p className="mx-auto mt-5 max-w-md rounded-md border border-[#e5e2dc] bg-[#f7f7f5] p-4 text-left text-sm leading-6 text-[#777777]">
          최대 4시간 이용 후 계속 사용하려면 책상에 부착된 QR을 스캔해 재예약해 주세요.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/" variant="secondary">홈으로 돌아가기</LinkButton>
          <LinkButton href="/my-reservations" className="!text-white hover:!text-white">내 예약 확인하기</LinkButton>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-4 p-4">
      <span className="text-sm text-[#777777]">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
