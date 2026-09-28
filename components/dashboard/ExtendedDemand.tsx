import { extendedHoursDemand } from "@/data/mockData";

const labels = ["18:00", "20:00", "22:00", "24:00"];

export function ExtendedDemand() {
  return (
    <div className="rounded-lg border border-[#e5e2dc] bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="font-semibold">Extended Hours Demand</h3>
        <p className="mt-1 text-sm text-[#777777]">운영시간 조정을 위한 의사결정 지원 데이터</p>
      </div>
      <div className="space-y-4">
        {extendedHoursDemand.map((period) => (
          <div key={period.period}>
            <div className="mb-2 flex justify-between text-sm">
              <span>{period.period} Period</span>
              <span className="text-[#777777]">Usage Demand</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {period.values.map((value, index) => (
                <div key={labels[index]} className="rounded-md border border-[#e5e2dc] bg-[#f7f7f5] p-3">
                  <div className="text-xs text-[#777777]">{labels[index]}</div>
                  <div className="mt-2 h-2 rounded-sm bg-[#e4e0d8]">
                    <div className="h-2 rounded-sm bg-[#222220]" style={{ width: `${value}%` }} />
                  </div>
                  <div className="mt-2 text-sm font-semibold">{value}%</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
