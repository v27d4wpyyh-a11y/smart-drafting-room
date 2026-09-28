import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-[#222220] text-white border-[#222220] hover:bg-black",
  secondary: "bg-white text-[#1f1f1f] border-[#d8d5cf] hover:border-[#222220]",
  ghost: "bg-transparent text-[#1f1f1f] border-transparent hover:bg-white"
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn("focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition", variants[variant], className)}
      {...props}
    />
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  className
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-semibold transition", variants[variant], className)}
    >
      {children}
    </Link>
  );
}
