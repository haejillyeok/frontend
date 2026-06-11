"use client";

import { useEffect, useState } from "react";

import { readLoginData } from "@/shared/auth";

const emptyLoginDataText = "저장된 로그인 데이터가 없습니다.";

export function PlayPage() {
  const [loginDataText, setLoginDataText] = useState(emptyLoginDataText);

  useEffect(() => {
    setLoginDataText(readLoginData() ?? emptyLoginDataText);
  }, []);

  return (
    <main className="min-h-dvh bg-hae-ink p-5 text-hae-paper sm:p-8">
      <pre className="whitespace-pre-wrap break-words text-sm leading-6">
        {`loginData:
${loginDataText}`}
      </pre>
    </main>
  );
}
