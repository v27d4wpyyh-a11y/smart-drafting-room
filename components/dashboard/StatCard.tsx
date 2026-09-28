import type { LucideIcon } from "lucide-react";

export function StatCard({ label, value, helper, icon: Icon }: { label: string; value: string; helper: string; icon: LucideIcon }) {
  return (
    <div className="rounded-lg border border-[#e5e2dc] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-[#777777]">{label}</p>
        <Icon size={18} className="text-[#777777]" />
      </div>
      <div className="text-3xl font-semibold">{value}</div>
      <p className="mt-2 text-sm text-[#777777]">{helper}</p>
    </div>
  );
}
