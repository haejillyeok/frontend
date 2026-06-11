import Link from "next/link";

import { Button } from "@/shared/ui";

export function PlayPage() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-hae-ink px-5 py-10 text-hae-paper">
      <div className="absolute inset-0 [background:linear-gradient(180deg,var(--color-hae-blue-hour)_0%,var(--color-hae-ink)_62%,#10121b_100%)]" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-hae-mint/70 to-transparent" />

      <section className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <p className="text-sm font-bold text-hae-mint">플레이</p>
        <h1 className="mt-4 text-5xl font-black leading-none sm:text-7xl">
          게임방 준비중
        </h1>
        <p className="mt-6 text-base leading-7 text-hae-paper/68">
          로그인 후 이동할 플레이 화면 자리입니다.
        </p>
        <Button
          asChild
          className="mt-8 bg-hae-gold font-black text-hae-ink hover:bg-hae-paper focus-visible:border-hae-gold focus-visible:ring-hae-gold/40"
          size="lg"
        >
          <Link href="/">홈으로</Link>
        </Button>
      </section>
    </main>
  );
}
