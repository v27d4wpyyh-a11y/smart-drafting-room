import { Bell, Clock, ShieldCheck } from "lucide-react";

const notices = [
  { title: "Quiet Zone 운영 안내", body: "Drafting Room 1은 개인작업과 시험공부 중심으로 운영됩니다.", icon: ShieldCheck },
  { title: "Creative Zone 정리 기준", body: "모형작업 후 공용 테이블과 바닥 잔여물을 정리해 주세요.", icon: Bell },
  { title: "야간 수요 데이터 수집", body: "운영시간 조정은 예약 수요 분석 후 관리자가 검토합니다.", icon: Clock }
];

export default function NoticePage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <h1 className="text-4xl font-semibold">Notice</h1>
      <p className="mt-2 text-[#777777]">제도실 운영 안내와 향후 확장 계획입니다.</p>
      <div className="mt-8 grid gap-4">
        {notices.map((notice) => {
          const Icon = notice.icon;
          return (
            <article key={notice.title} className="flex gap-4 rounded-lg border border-[#e5e2dc] bg-white p-5 shadow-sm">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-[#f0eee8]"><Icon size={18} /></span>
              <div>
                <h2 className="font-semibold">{notice.title}</h2>
                <p className="mt-1 text-sm leading-6 text-[#777777]">{notice.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
