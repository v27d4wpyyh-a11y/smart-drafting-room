import { cn } from "@/lib/utils";

const steps = ["Seat", "Date & Time", "Confirm", "Complete"];

export function ReservationStepper({ active = 1 }: { active?: number }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {steps.map((step, index) => {
        const current = index + 1 <= active;
        return (
          <div key={step} className="flex items-center gap-2">
            <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-md border text-sm font-semibold", current ? "border-[#222220] bg-[#222220] !text-white" : "border-[#d8d5cf] bg-white text-[#777777]")}>
              {index + 1}
            </span>
            <span className="hidden text-sm font-medium text-[#777777] sm:inline">{step}</span>
          </div>
        );
      })}
    </div>
  );
}
