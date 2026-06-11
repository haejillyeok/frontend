"use client";

import { Button } from "@/shared/ui";

function handleStartClick() {
  console.log("게임 시작 버튼이 클릭되었습니다.");
}

export function HomePage() {
  return (
    <main className="relative flex min-h-dvh w-full overflow-hidden bg-hae-ink px-5 py-6 text-hae-paper sm:px-8 sm:py-10">
      <div className="absolute inset-0 [background:var(--hae-gradient-sunset)]" />
      <div className="absolute inset-x-0 bottom-[27%] h-px bg-gradient-to-r from-transparent via-hae-gold/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[34%] [background:var(--hae-gradient-nightfall)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <span className="text-sm font-black text-hae-paper sm:text-base">
            해질녘
          </span>
        </header>

        <section className="grid flex-1 place-items-center py-16 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-6xl font-black leading-none text-hae-paper sm:text-8xl lg:text-9xl">
              해질녘
            </h1>

            <Button
              className="mt-8 bg-hae-gold font-black text-hae-ink shadow-[0_18px_52px_rgba(255,209,102,0.24)] hover:-translate-y-0.5 hover:bg-hae-paper focus-visible:border-hae-gold focus-visible:ring-hae-gold/40 active:translate-y-0"
              onClick={handleStartClick}
              size="lg"
              type="button"
            >
              게임 시작
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
