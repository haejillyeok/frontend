import type { StaticImageData } from "next/image";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

type ImageSource = StaticImageData | string;

export type ImageButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  backgroundImage: ImageSource;
  children: ReactNode;
  disabledBackgroundImage?: ImageSource;
};

function getImageUrl(image: ImageSource) {
  return typeof image === "string" ? image : image.src;
}

export function ImageButton({
  backgroundImage,
  children,
  className,
  disabled,
  disabledBackgroundImage,
  style,
  type = "button",
  ...props
}: ImageButtonProps) {
  const enabledBackgroundStyle = {
    backgroundImage: `url(${getImageUrl(backgroundImage)})`,
  } satisfies CSSProperties;
  const disabledBackgroundStyle = disabledBackgroundImage
    ? ({
        backgroundImage: `url(${getImageUrl(disabledBackgroundImage)})`,
      } satisfies CSSProperties)
    : undefined;
  const showDisabledBackground = disabled && disabledBackgroundImage;

  return (
    <button
      className={cn(
        "relative inline-grid aspect-[408/108] w-[306px] cursor-pointer place-items-center overflow-hidden border-0 bg-transparent p-0 align-middle text-center text-lg font-medium text-hae-paper transition-transform enabled:active:translate-y-px disabled:cursor-not-allowed disabled:text-hae-paper/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hae-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-hae-ink",
        className,
      )}
      disabled={disabled}
      style={style}
      type={type}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity",
          showDisabledBackground ? "opacity-0" : "opacity-100",
        )}
        style={enabledBackgroundStyle}
      />
      {disabledBackgroundStyle ? (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity",
            showDisabledBackground ? "opacity-100" : "opacity-0",
          )}
          style={disabledBackgroundStyle}
        />
      ) : null}
      <span className="relative z-10 max-w-[70%] truncate px-1 [text-shadow:0_2px_3px_rgb(0_0_0/0.75)]">
        {children}
      </span>
    </button>
  );
}
