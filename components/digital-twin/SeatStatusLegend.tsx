const items = [
  { label: "Available", className: "bg-[#7fa88b]" },
  { label: "Reserved", className: "bg-[#c88378]" },
  { label: "Unavailable", className: "bg-[#cfcfc9]" }
];

export function SeatStatusLegend() {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-[#777777]">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-sm ${item.className}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
