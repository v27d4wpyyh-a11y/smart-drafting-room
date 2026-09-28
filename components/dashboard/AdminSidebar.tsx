import { BarChart3, ClipboardList, Clock, MapPinned } from "lucide-react";

const items = [
  { label: "Reservation Rate", icon: BarChart3 },
  { label: "Issue Reports", icon: ClipboardList },
  { label: "Peak Time", icon: Clock },
  { label: "Locations", icon: MapPinned }
];

export function AdminSidebar() {
  return (
    <aside className="rounded-lg border border-[#e5e2dc] bg-white p-4 shadow-sm lg:sticky lg:top-24">
      <p className="px-2 text-xs font-semibold uppercase text-[#777777]">FM Manager</p>
      <div className="mt-4 space-y-1">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <button key={item.label} className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm ${index === 0 ? "bg-[#222220] !text-white" : "text-[#777777] hover:bg-[#f7f7f5] hover:text-[#1f1f1f]"}`}>
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
