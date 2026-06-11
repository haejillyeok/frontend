"use client";

import { useEffect, useState } from "react";

import { readLoginData } from "@/shared/auth";

const emptyLoginDataText = "저장된 로그인 데이터가 없습니다.";
const emptyCookieText = "document.cookie로 읽을 수 있는 쿠키가 없습니다.";

export function PlayPage() {
  const [loginDataText, setLoginDataText] = useState(emptyLoginDataText);
  const [cookieText, setCookieText] = useState(emptyCookieText);

  useEffect(() => {
    setLoginDataText(readLoginData() ?? emptyLoginDataText);
    setCookieText(document.cookie || emptyCookieText);
  }, []);

  return (
    <main className="min-h-dvh bg-hae-ink p-5 text-hae-paper sm:p-8">
      <pre className="whitespace-pre-wrap break-words text-sm leading-6">
        {`loginData:
${loginDataText}

cookies:
${cookieText}`}
      </pre>
    </main>
  );
}
