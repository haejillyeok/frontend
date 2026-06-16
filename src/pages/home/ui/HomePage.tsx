"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { SyntheticEvent } from "react";
import { useState } from "react";

import { authApi } from "@/shared/api";
import { saveLoginData } from "@/shared/auth";
import {
  ImageButton,
  imageButtonBg,
  imageButtonDisabledBg,
  logoImage,
  PixelInput,
} from "@/shared/ui";
import {
  getLoginErrorMessage,
  type LoginFieldErrors,
  loginFieldConstraints,
  loginWithCredentials,
  validateLoginForm,
} from "../model/auth-login";
import { createGuestAccountId } from "../model/guest-account";
import heroBg from "./hero-bg.webp";
import { SignupModal } from "./SignupModal";

const guestLoginErrorMessage =
  "게스트 입장에 실패했습니다. 잠시 후 다시 시도해 주세요.";

export function HomePage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const isBusy = isStarting || isLoggingIn;
  const canSubmitLogin =
    accountId.trim().length >= loginFieldConstraints.accountId.minLength &&
    password.length >= loginFieldConstraints.password.minLength;
  const visibleError =
    fieldErrors.account_id ?? fieldErrors.password ?? submitError;
  const visibleErrorField = fieldErrors.account_id
    ? "account_id"
    : fieldErrors.password
      ? "password"
      : null;
  const accountIdDescription =
    visibleErrorField === "account_id" ? "home-error-message" : undefined;
  const passwordDescription =
    visibleErrorField === "password" ? "home-error-message" : undefined;

  async function handleLoginSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isBusy) {
      return;
    }

    const nextFieldErrors = validateLoginForm({
      account_id: accountId.trim(),
      password,
    });

    setFieldErrors(nextFieldErrors);
    setSubmitError(null);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setIsLoggingIn(true);

    try {
      await loginWithCredentials({
        account_id: accountId.trim(),
        password,
      });
      router.push("/play");
    } catch (error) {
      setSubmitError(await getLoginErrorMessage(error));
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleQuickStartClick() {
    if (isBusy) {
      return;
    }

    const guestCredential = createGuestAccountId();

    setIsStarting(true);
    setSubmitError(null);
    setFieldErrors({});

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
      setSubmitError(guestLoginErrorMessage);
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
        <form
          className="mx-auto mt-6 flex w-full max-w-[306px] flex-col items-center gap-3"
          noValidate
          onSubmit={handleLoginSubmit}
        >
          <div className="flex w-full flex-col gap-2">
            <PixelInput
              aria-describedby={accountIdDescription}
              aria-invalid={Boolean(fieldErrors.account_id)}
              autoComplete="username"
              disabled={isBusy}
              maxLength={loginFieldConstraints.accountId.maxLength}
              minLength={loginFieldConstraints.accountId.minLength}
              name="account_id"
              onChange={(event) => setAccountId(event.currentTarget.value)}
              pattern={loginFieldConstraints.accountId.pattern}
              placeholder="계정 ID"
              value={accountId}
            />
            <PixelInput
              aria-describedby={passwordDescription}
              aria-invalid={Boolean(fieldErrors.password)}
              autoComplete="current-password"
              disabled={isBusy}
              maxLength={loginFieldConstraints.password.maxLength}
              minLength={loginFieldConstraints.password.minLength}
              name="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
              placeholder="비밀번호"
              type="password"
              value={password}
            />
          </div>
          <div className="min-h-9 w-full">
            {visibleError ? (
              <p
                className="rounded border border-hae-ember/35 bg-hae-ember/12 px-3 py-2 text-center text-sm font-medium text-hae-paper"
                id="home-error-message"
                role="alert"
              >
                {visibleError}
              </p>
            ) : null}
          </div>
          <div className="flex w-full flex-col items-center [&>button+button]:-mt-4">
            <ImageButton
              backgroundImage={imageButtonBg}
              className="w-[306px]"
              disabled={isBusy || !canSubmitLogin}
              disabledBackgroundImage={imageButtonDisabledBg}
              type="submit"
            >
              {isLoggingIn ? "입장 중" : "입장하기"}
            </ImageButton>
            <SignupModal disabled={isBusy} />
            <ImageButton
              backgroundImage={imageButtonBg}
              className="w-[306px]"
              disabled={isBusy}
              disabledBackgroundImage={imageButtonDisabledBg}
              onClick={handleQuickStartClick}
            >
              {isStarting ? "입장 중" : "빠른 입장"}
            </ImageButton>
          </div>
        </form>
      </div>
    </main>
  );
}
