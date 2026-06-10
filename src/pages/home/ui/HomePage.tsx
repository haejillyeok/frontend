export function HomePage() {
  const floatingLetters = ["해", "질", "녘", "곧", "문", "을", "열", "다"];

  return (
    <main className="relative flex min-h-screen w-full overflow-hidden bg-[#171925] px-5 py-6 text-[#f8f3ea] sm:px-8 sm:py-10">
      <style>
        {`
          @keyframes drift-letter {
            0% {
              opacity: 0;
              transform: translate3d(0, 28px, 0) rotate(-8deg);
            }
            18%, 82% {
              opacity: 0.72;
            }
            100% {
              opacity: 0;
              transform: translate3d(0, -94vh, 0) rotate(9deg);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .home-floating-letter {
              animation: none !important;
            }
          }
        `}
      </style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_82%,rgba(242,107,56,0.38),transparent_24rem),linear-gradient(180deg,#202844_0%,#3f2c47_48%,#f26b38_72%,#171925_73%)]" />
      <div className="absolute inset-x-0 bottom-[26%] h-px bg-gradient-to-r from-transparent via-[#ffd166]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,rgba(23,25,37,0)_0%,#171925_35%,#10121b_100%)]" />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {floatingLetters.map((letter, index) => (
          <span
            className="home-floating-letter absolute bottom-[-3rem] rounded border border-[#f8f3ea]/10 bg-[#f8f3ea]/5 px-3 py-2 text-sm font-semibold text-[#f8f3ea]/55 backdrop-blur-sm"
            key={letter}
            style={{
              animation: `drift-letter ${17 + index * 2}s linear infinite`,
              animationDelay: `${index * 1.8}s`,
              left: `${10 + index * 11}%`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-between">
        <header className="flex items-center justify-between gap-4 text-xs font-semibold text-[#f8f3ea]/72 sm:text-sm">
          <span className="font-black text-[#f8f3ea]">해질녘</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#78c6a3] shadow-[0_0_18px_rgba(120,198,163,0.9)]" />
            공개 준비 중
          </span>
        </header>

        <section className="grid flex-1 place-items-center py-10 text-center sm:py-12">
          <div className="mx-auto max-w-2xl">
            <p className="mb-5 inline-flex border border-[#ffd166]/35 bg-[#171925]/35 px-3 py-1 text-xs font-bold text-[#ffd166] backdrop-blur-md">
              곧 만나요
            </p>

            <h1 className="text-5xl font-black leading-[1.02] text-[#f8f3ea] sm:text-7xl lg:text-8xl">
              해질녘
              <span className="block text-[#ffd166]">준비중</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-7 text-[#f8f3ea]/70 sm:text-xl sm:leading-8">
              잠시만 기다려주세요.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
