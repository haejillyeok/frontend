import playBg from "./play-bg.webp";

export function PlayPage() {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-hae-ink">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${playBg.src})` }}
      />
    </main>
  );
}
