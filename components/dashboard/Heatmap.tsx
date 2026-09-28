import type { DailyUsageData } from "@/types";

function tone(value: number) {
  if (value > 80) return "bg-[#222220] !text-white";
  if (value > 65) return "bg-[#68645d] !text-white";
  if (value > 45) return "bg-[#aaa396] !text-white";
  return "bg-[#e4e0d8] text-[#1f1f1f]";
}

export function Heatmap({ data }: { data: DailyUsageData[] }) {
  return (
    <div className="rounded-lg border border-[#e5e2dc] bg-white p-5 shadow-sm">
      <h3 className="font-semibold">요일별 예약률</h3>
      <div className="mt-6 space-y-3">
        {(["quiet", "creative"] as const).map((zone) => (
          <div key={zone} className="grid grid-cols-[88px_1fr] gap-3">
            <span className="pt-3 text-sm text-[#777777]">{zone === "quiet" ? "Quiet" : "Creative"}</span>
            <div className="grid grid-cols-7 gap-2">
              {data.map((item) => (
                <div key={`${zone}-${item.day}`} className={`rounded-md p-2 text-center text-xs font-semibold ${tone(item[zone])}`}>
                  <div>{item.day}</div>
                  <div className="mt-1">{item[zone]}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
