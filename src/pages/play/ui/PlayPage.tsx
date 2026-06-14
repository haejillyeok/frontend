"use client";

import { useEffect, useState } from "react";

import { readLoginData } from "@/shared/auth";
import { PlayHeader } from "./PlayHeader";

const emptyLoginDataText = "저장된 로그인 데이터가 없습니다.";
const defaultNickname = "플레이어";

type PlaySessionState = {
  loginDataText: string;
  nickname: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function getNickname(loginDataText: string | null) {
  if (!loginDataText) {
    return defaultNickname;
  }

  try {
    const loginData = asRecord(JSON.parse(loginDataText));
    const user = asRecord(loginData?.user);
    const nickname = user?.nickname;

    return typeof nickname === "string" && nickname.trim().length > 0
      ? nickname
      : defaultNickname;
  } catch {
    return defaultNickname;
  }
}

export function PlayPage() {
  const [sessionState, setSessionState] = useState<PlaySessionState>({
    loginDataText: emptyLoginDataText,
    nickname: defaultNickname,
  });

  useEffect(() => {
    const loginDataText = readLoginData();

    setSessionState({
      loginDataText: loginDataText ?? emptyLoginDataText,
      nickname: getNickname(loginDataText),
    });
  }, []);

  return (
    <main className="min-h-dvh bg-hae-ink px-5 py-6 text-hae-paper sm:px-8 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <PlayHeader nickname={sessionState.nickname} />

        <pre className="whitespace-pre-wrap break-words rounded-lg border border-hae-paper/10 bg-hae-blue-hour/40 p-4 text-sm leading-6 text-hae-paper/76">
          {`loginData:
${sessionState.loginDataText}`}
        </pre>
      </div>
    </main>
  );
}
