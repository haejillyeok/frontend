import Link from "next/link";

type PlayHeaderProps = {
  nickname: string;
};

export function PlayHeader({ nickname }: PlayHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-4 rounded-lg border border-hae-paper/12 bg-hae-blue-hour/70 px-4 py-3 shadow-[0_18px_50px_rgb(10_12_20/0.22)] backdrop-blur-md">
      <Link
        className="text-sm font-black text-hae-paper transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hae-gold/70 sm:text-base"
        href="/"
      >
        해질녘
      </Link>

      <div
        className="flex min-w-0 max-w-[min(62vw,16rem)] items-center gap-2 rounded-md border border-hae-paper/12 bg-hae-ink/36 px-3 py-2"
        title={nickname}
      >
        <span
          aria-hidden="true"
          className="size-2 shrink-0 rounded-full bg-hae-mint shadow-[0_0_16px_rgb(120_198_163/0.5)]"
        />
        <span className="truncate text-sm font-black text-hae-paper">
          {nickname}
        </span>
      </div>
    </header>
  );
}
