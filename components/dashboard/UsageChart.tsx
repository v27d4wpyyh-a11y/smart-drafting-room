import type { UsageData } from "@/types";

export function UsageChart({ data }: { data: UsageData[] }) {
  return (
    <div className="rounded-lg border border-[#e5e2dc] bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="font-semibold">시간대별 예약 현황</h3>
        <p className="mt-1 text-sm text-[#777777]">Reservation Rate by time</p>
      </div>
      <div className="flex h-64 items-end gap-3 border-b border-l border-[#e5e2dc] pl-3">
        {data.map((item) => (
          <div key={item.hour} className="flex flex-1 flex-col items-center justify-end gap-1">
            <div className="flex h-52 w-full items-end justify-center gap-1">
              <div className="w-3 rounded-t-sm bg-[#222220]" style={{ height: `${item.quiet}%` }} title={`Quiet ${item.quiet}%`} />
              <div className="w-3 rounded-t-sm bg-[#b99d61]" style={{ height: `${item.creative}%` }} title={`Creative ${item.creative}%`} />
            </div>
            <span className="text-xs text-[#777777]">{item.hour}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-5 text-xs text-[#777777]">
        <span className="flex items-center gap-2"><span className="h-3 w-3 bg-[#222220]" /> Quiet Zone</span>
        <span className="flex items-center gap-2"><span className="h-3 w-3 bg-[#b99d61]" /> Creative Zone</span>
      </div>
    </div>
  );
}
