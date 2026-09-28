import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { rooms } from "@/data/mockData";

export default function Home() {
  return (
    <main className="bg-[#f7f5f2]">
      <section className="border-b border-[#e2ddd5] bg-[#f7f5f2]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[55%_45%] lg:items-center lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4">
              <img src="/khu-seal.png" alt="Kyung Hee University seal" className="h-40 w-40 object-contain md:h-60 md:w-60" />
              <div className="h-28 border-l border-[#d6d0c7] md:h-40" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f1827]">Kyung Hee University</p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-[#6e6863]">College of Human Ecology</p>
              </div>
            </div>

            <h1 className="text-4xl font-bold leading-tight text-[#241f1d] md:text-5xl">
              경희대학교 주거환경학과<br />
              제도실 예약 시스템
            </h1>

            <p className="mt-7 max-w-2xl text-3xl font-bold leading-tight text-[#8f1827] md:text-4xl">
              RIGHT SPACE<br className="sm:hidden" /> FOR THE RIGHT ACTIVITY.
            </p>

            <p className="mt-6 text-2xl font-semibold leading-relaxed text-[#3a3431]">
              필요할 때 자유롭게,<br />
              이용할 때는 체계적으로.
            </p>

            <p className="mt-7 text-base font-medium leading-7 text-[#6e6863]">
              Digital Twin-based<br />
              Drafting Room Management System
            </p>
          </div>

          <aside className="rounded-md border border-[#ded8cf] bg-white p-6 shadow-sm md:p-8">
            <div className="border-b border-[#e5e0d8] pb-5">
              <p className="text-3xl font-bold tracking-wide text-[#8f1827]">LOGIN</p>
              <p className="mt-2 text-sm font-medium text-[#6e6863]">경희대학교 구성원 로그인</p>
            </div>

            <div className="mt-6 space-y-5">
              <label className="grid gap-2 text-sm font-semibold text-[#2a2523]">
                통합아이디
                <input
                  type="text"
                  autoComplete="username"
                  className="focus-ring h-12 rounded-sm border border-[#d8d2c9] bg-[#fbfaf8] px-3 font-normal"
                  aria-label="통합아이디"
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-[#2a2523]">
                비밀번호
                <input
                  type="password"
                  autoComplete="current-password"
                  className="focus-ring h-12 rounded-sm border border-[#d8d2c9] bg-[#fbfaf8] px-3 font-normal"
                  aria-label="비밀번호"
                />
              </label>

              <label className="flex items-center gap-2 text-sm text-[#5f5954]">
                <input type="checkbox" className="h-4 w-4 accent-[#8f1827]" />
                아이디 저장
              </label>

              <button
                type="button"
                className="focus-ring h-12 w-full rounded-sm border border-[#8f1827] bg-[#8f1827] px-4 text-sm font-bold text-white transition hover:bg-[#74131f]"
              >
                로그인
              </button>

              <div className="flex items-center justify-center gap-5 text-sm text-[#6e6863]">
                <a href="#" className="hover:text-[#8f1827]">아이디 찾기</a>
                <span className="h-3 border-l border-[#d8d2c9]" />
                <a href="#" className="hover:text-[#8f1827]">비밀번호 찾기</a>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold text-[#9a9289]">
                <span className="h-px flex-1 bg-[#e5e0d8]" />
                또는
                <span className="h-px flex-1 bg-[#e5e0d8]" />
              </div>

              <LinkButton href="#space-selection" variant="secondary" className="h-12 w-full rounded-sm border-[#8f1827] text-[#8f1827] hover:border-[#8f1827] hover:bg-[#fff7f8]">
                데모 계정으로 체험하기 <ArrowRight size={16} />
              </LinkButton>

              <p className="rounded-sm border border-[#e5e0d8] bg-[#fbfaf8] p-3 text-xs leading-5 text-[#6e6863]">
                본 서비스는 캡스톤디자인 프로토타입으로, 실제 Info21 계정과 연동되지 않습니다.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section id="space-selection" className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8f1827]">Drafting Room Reservation</p>
          <h2 className="mt-3 text-3xl font-bold text-[#241f1d]">활동 목적에 맞는 제도실 선택</h2>
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
                    <h3 className="mt-2 text-2xl font-bold text-[#241f1d]">{room.zone}</h3>
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
