"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authApi } from "@/shared/api";
import { saveLoginData } from "@/shared/auth";
import { Button } from "@/shared/ui";
import { PublicHeader } from "@/widgets/public-header";

const guestIdAlphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const guestLoginErrorMessage =
  "게스트 입장에 실패했습니다. 잠시 후 다시 시도해 주세요.";

function createGuestCredential() {
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);

  const randomPart = Array.from(
    bytes,
    (byte) => guestIdAlphabet[byte % guestIdAlphabet.length],
  ).join("");

  return `guest_${randomPart}`;
}

export function HomePage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  async function handleStartClick() {
    if (isStarting) {
      return;
    }

    const guestCredential = createGuestCredential();

    setIsStarting(true);
    setStartError(null);

    try {
      const loginResult = await authApi.beAuthLogin({
        loginRequest: {
          account_id: guestCredential,
          nickname: guestCredential,
          password: guestCredential,
        },
      });
      saveLoginData(loginResult.data);
      router.push("/play");
    } catch {
      setStartError(guestLoginErrorMessage);
    } finally {
      setIsStarting(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh w-full overflow-hidden bg-hae-ink px-5 py-6 text-hae-paper sm:px-8 sm:py-10">
      <div className="absolute inset-0 [background:var(--hae-gradient-sunset)]" />
      <div className="absolute inset-x-0 bottom-[27%] h-px bg-gradient-to-r from-transparent via-hae-gold/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[34%] [background:var(--hae-gradient-nightfall)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col">
        <PublicHeader />

        <section className="grid flex-1 place-items-center py-16 text-center">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-black leading-none text-hae-paper sm:text-7xl lg:text-8xl">
              해질녘
            </h1>

            <Button
              className="mt-8 cursor-pointer bg-hae-gold font-black text-hae-ink shadow-[0_18px_52px_rgba(255,209,102,0.24)] hover:-translate-y-0.5 hover:bg-hae-paper focus-visible:border-hae-gold focus-visible:ring-hae-gold/40 active:translate-y-0"
              disabled={isStarting}
              onClick={handleStartClick}
              size="lg"
              type="button"
            >
              {isStarting ? "입장 중" : "게임 시작"}
            </Button>
            {startError ? (
              <p
                className="mt-4 text-sm font-medium text-hae-paper"
                role="alert"
              >
                {startError}
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
