export function HomePage() {
  return (
    <main className="flex-1 w-full">
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        <section className="w-full max-w-3xl rounded-lg border border-zinc-200 bg-white p-8 text-center shadow-lg">
          <p className="text-muted">끝말잇기 한 판</p>
          <h1 className="text-7xl sm:text-8xl my-6">해질녘</h1>
          <button
            type="button"
            className="rounded-md bg-zinc-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-zinc-700"
          >
            게임 시작
          </button>
        </section>
      </div>
    </main>
  );
}
