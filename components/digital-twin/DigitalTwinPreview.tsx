export function DigitalTwinPreview({ zone }: { zone: string }) {
  return (
    <div className="rounded-lg border border-[#e5e2dc] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Digital Twin 3D View</h3>
        <span className="text-xs text-[#777777]">Future model-ready placeholder</span>
      </div>
      <div className="relative h-72 overflow-hidden rounded-md border border-[#e5e2dc] bg-[#efeee9] [perspective:900px]">
        <div className="absolute left-1/2 top-1/2 grid w-[520px] -translate-x-1/2 -translate-y-1/2 rotate-x-[58deg] rotate-z-[-34deg] grid-cols-6 gap-3">
          {Array.from({ length: 30 }).map((_, index) => (
            <div key={index} className="h-10 rounded-sm border border-[#cfcfc9] bg-white shadow-[8px_8px_0_rgba(31,31,31,0.08)]" />
          ))}
        </div>
        <div className="absolute bottom-4 left-4 rounded-md border border-[#d8d5cf] bg-white/88 px-3 py-2 text-sm">
          {zone} spatial model
        </div>
      </div>
    </div>
  );
}
