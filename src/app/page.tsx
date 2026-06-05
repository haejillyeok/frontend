export default function Home() {
  return (
    <main className="flex-1 w-full">
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        <section className="paper shadow shadow-large max-w-3xl w-full text-center">
          <p className="text-muted">끝말잇기 한 판</p>
          <h1 className="text-7xl sm:text-8xl my-6">해질녘</h1>
          <button type="button" className="btn-primary btn-large">
            게임 시작
          </button>
        </section>
      </div>
    </main>
  );
}
