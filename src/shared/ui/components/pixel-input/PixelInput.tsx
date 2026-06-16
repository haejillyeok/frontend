import type { InputHTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

export type PixelInputProps = InputHTMLAttributes<HTMLInputElement>;

export function PixelInput({
  className,
  type = "text",
  ...props
}: PixelInputProps) {
  return (
    <input
      className={cn(
        "h-9 w-full rounded-none border border-hae-ink/35 bg-hae-paper/82 px-3 font-galmuri text-sm font-normal text-hae-ink outline-none transition placeholder:text-hae-ink/55 focus:border-hae-gold focus:ring-2 focus:ring-hae-gold/35 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-hae-ember aria-invalid:ring-hae-ember/25",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
