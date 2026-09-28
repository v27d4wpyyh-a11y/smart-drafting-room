export function IssueChart({ items }: { items: Array<{ label: string; value: number }> }) {
  const max = Math.max(...items.map((item) => item.value));
  return (
    <div className="rounded-lg border border-[#e5e2dc] bg-white p-5 shadow-sm">
      <h3 className="font-semibold">불편사항 유형</h3>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[96px_1fr_32px] items-center gap-3 text-sm">
            <span className="text-[#777777]">{item.label}</span>
            <div className="h-3 rounded-sm bg-[#ece9e2]">
              <div className="h-3 rounded-sm bg-[#222220]" style={{ width: `${(item.value / max) * 100}%` }} />
            </div>
            <span className="text-right font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
