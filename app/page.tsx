import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="bg-[#f7f5f2]">
      <section className="border-b border-[#e2ddd5] bg-[#f7f5f2]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:py-14 lg:grid-cols-[55%_45%] lg:items-center lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-3 sm:gap-4">
              <img src="/khu-seal.png" alt="Kyung Hee University seal" className="h-28 w-28 shrink-0 object-contain sm:h-40 sm:w-40 md:h-60 md:w-60" />
              <div className="h-24 shrink-0 border-l border-[#d6d0c7] sm:h-28 md:h-40" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase leading-5 tracking-[0.12em] text-[#8f1827] sm:text-xs sm:tracking-[0.18em]">Kyung Hee University</p>
                <p className="mt-1 max-w-44 text-xs font-semibold uppercase leading-5 tracking-[0.08em] text-[#6e6863] sm:max-w-none sm:text-sm sm:tracking-[0.12em]">College of Human Ecology</p>
              </div>
            </div>

            <h1 className="text-3xl font-bold leading-tight text-[#241f1d] sm:text-4xl md:text-5xl">
              경희대학교 주거환경학과<br />
              제도실 예약 시스템
            </h1>

            <p className="mt-7 max-w-2xl text-2xl font-bold leading-tight text-[#8f1827] sm:text-3xl md:text-4xl">
              <span className="block">RIGHT SPACE FOR</span>
              <span className="block">THE RIGHT ACTIVITY.</span>
            </p>

            <p className="mt-6 text-xl font-semibold leading-relaxed text-[#3a3431] sm:text-2xl">
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

              <LinkButton
                href="/spaces"
                className="h-12 w-full rounded-sm border-[#8f1827] bg-[#8f1827] px-4 text-sm font-bold !text-white transition hover:bg-[#74131f] hover:!text-white"
              >
                로그인
              </LinkButton>

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

              <LinkButton href="/spaces" variant="secondary" className="h-auto min-h-12 w-full rounded-sm border-[#8f1827] px-3 py-3 text-center text-[#8f1827] hover:border-[#8f1827] hover:bg-[#fff7f8]">
                데모 계정으로 체험하기 <ArrowRight size={16} />
              </LinkButton>

              <p className="rounded-sm border border-[#e5e0d8] bg-[#fbfaf8] p-3 text-xs leading-5 text-[#6e6863]">
                본 서비스는 캡스톤디자인 프로토타입으로, 실제 Info21 계정과 연동되지 않습니다.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
