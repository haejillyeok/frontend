"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createGuestAccountId } from "@/entities/account";
import { authApi } from "@/shared/api";
import { saveLoginData } from "@/shared/auth";
import {
  ImageButton,
  imageButtonBg,
  imageButtonDisabledBg,
  logoImage,
} from "@/shared/ui";

import heroBg from "./hero-bg.webp";

const guestLoginErrorMessage =
  "게스트 입장에 실패했습니다. 잠시 후 다시 시도해 주세요.";

export function HomePage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  async function handleStartClick() {
    if (isStarting) {
      return;
    }

    const guestCredential = createGuestAccountId();

    setIsStarting(true);
    setStartError(null);

    try {
      const signupResult = await authApi.beAuthSignup({
        signupRequest: {
          account_id: guestCredential,
          nickname: guestCredential,
          password: guestCredential,
        },
      });
      saveLoginData(signupResult.data);
      router.push("/play");
    } catch {
      setStartError(guestLoginErrorMessage);
    } finally {
      setIsStarting(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh w-full overflow-hidden bg-hae-ink px-5 py-6 text-hae-paper sm:px-8 sm:py-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg.src})` }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col">
        <h2 className="text-center text-[21px] leading-[27px] tracking-[0.5px] [text-shadow:0px_10px_8px_#00000080] sm:text-[36px] sm:leading-[42px]">
          오늘 밤 이곳에는 초대받지 못한 손님이 함께 머뭅니다.
        </h2>
        <Image
          alt="해질녘"
          className="mx-auto mt-8 h-auto w-[480px] sm:w-[640px]"
          priority
          src={logoImage}
        />
        <div className="mt-6 flex flex-col items-center gap-3">
          <ImageButton
            backgroundImage={imageButtonBg}
            className="w-[306px]"
            disabled={isStarting}
            disabledBackgroundImage={imageButtonDisabledBg}
            onClick={handleStartClick}
          >
            {isStarting ? "입장 중" : "입장하기"}
          </ImageButton>
          <ImageButton
            backgroundImage={imageButtonBg}
            className="w-[306px]"
            disabled
            disabledBackgroundImage={imageButtonDisabledBg}
          >
            준비 중
          </ImageButton>
          {startError ? (
            <p className="text-sm font-medium text-hae-paper" role="alert">
              {startError}
            </p>
          ) : null}
        </div>
        {/* <PublicHeader /> */}

        {/* <section className="grid flex-1 place-items-center py-16 text-center">
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
        </section> */}
      </div>
    </main>
  );
}
