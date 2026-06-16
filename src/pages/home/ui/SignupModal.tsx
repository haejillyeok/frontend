"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { SyntheticEvent } from "react";
import { useState } from "react";

import { authApi } from "@/shared/api";
import { saveLoginData } from "@/shared/auth";
import {
  brushImage,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  ImageButton,
  imageButtonBg,
  imageButtonDisabledBg,
  PixelInput,
  panelBgImage,
} from "@/shared/ui";

import {
  getSignupErrorMessage,
  type SignupFieldErrors,
  signupFieldConstraints,
  validateSignupForm,
} from "../model/signup";

type SignupModalProps = {
  disabled?: boolean;
};

export function SignupModal({ disabled }: SignupModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const canSubmitSignup =
    accountId.trim().length >= signupFieldConstraints.accountId.minLength &&
    password.length >= signupFieldConstraints.password.minLength &&
    nickname.trim().length >= signupFieldConstraints.nickname.minLength;
  const visibleError =
    fieldErrors.account_id ??
    fieldErrors.password ??
    fieldErrors.nickname ??
    submitError;

  function resetFormState() {
    setFieldErrors({});
    setSubmitError(null);
    setAccountId("");
    setPassword("");
    setNickname("");
  }

  function handleOpenChange(nextOpen: boolean) {
    if (isSubmitting && !nextOpen) {
      return;
    }

    setOpen(nextOpen);

    if (nextOpen) {
      resetFormState();
    }
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (isSubmitting) {
      return;
    }

    const trimmedAccountId = accountId.trim();
    const trimmedNickname = nickname.trim();
    const nextFieldErrors = validateSignupForm({
      account_id: trimmedAccountId,
      password,
      nickname: trimmedNickname,
    });

    setFieldErrors(nextFieldErrors);
    setSubmitError(null);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const signupResult = await authApi.beAuthSignup({
        signupRequest: {
          account_id: trimmedAccountId,
          nickname: trimmedNickname,
          password,
        },
      });
      saveLoginData(signupResult.data);
      router.push("/play");
    } catch (error) {
      setSubmitError(await getSignupErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <ImageButton
          backgroundImage={imageButtonBg}
          className="w-[306px]"
          disabled={disabled}
          disabledBackgroundImage={imageButtonDisabledBg}
        >
          가입하기
        </ImageButton>
      </DialogTrigger>
      <DialogContent
        className="max-w-[min(calc(100vw-2rem),556px)] overflow-visible border-0 bg-transparent p-0 text-hae-paper shadow-none ring-0 sm:max-w-[556px]"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">회원가입</DialogTitle>
        <DialogDescription className="sr-only">
          계정, 비밀번호, 활동명을 입력해 회원가입합니다.
        </DialogDescription>

        <form
          aria-label="회원가입"
          className="relative aspect-[556/616] w-full bg-contain bg-center bg-no-repeat drop-shadow-[0_4px_5px_rgb(0_0_0/0.45)]"
          noValidate
          onSubmit={handleSubmit}
          style={{ backgroundImage: `url(${panelBgImage.src})` }}
        >
          <div className="absolute inset-x-0 top-[16%] flex items-center justify-center gap-[2%]">
            <div
              aria-hidden="true"
              className="font-kimdaegeon text-[clamp(2.25rem,9vw,3.9375rem)] font-medium leading-none tracking-normal text-[#151010] [-webkit-text-stroke:1px_#f5f1ed] [text-shadow:0_3px_2px_rgb(0_0_0/0.72)]"
            >
              체크-인
            </div>
            <Image
              alt=""
              aria-hidden="true"
              className="h-[clamp(2.25rem,9vw,3.9375rem)] w-auto"
              src={brushImage}
            />
          </div>

          <div className="absolute inset-x-0 top-[32.5%] mx-auto flex w-[59%] flex-col gap-[clamp(0.45rem,2.4vw,0.875rem)] sm:top-[34.8%]">
            <label className="sr-only" htmlFor="signup-account_id">
              계정
            </label>
            <PixelInput
              aria-describedby={
                fieldErrors.account_id ? "signup-error-message" : undefined
              }
              aria-invalid={Boolean(fieldErrors.account_id)}
              autoComplete="username"
              className="h-[clamp(1.55rem,7vw,2.625rem)] border-0 bg-hae-paper/90 px-[clamp(0.75rem,2.6vw,1rem)] focus:ring-hae-gold/45"
              disabled={isSubmitting}
              id="signup-account_id"
              maxLength={signupFieldConstraints.accountId.maxLength}
              minLength={signupFieldConstraints.accountId.minLength}
              name="account_id"
              onChange={(event) => setAccountId(event.currentTarget.value)}
              pattern={signupFieldConstraints.accountId.pattern}
              placeholder="계정"
              type="text"
              value={accountId}
            />

            <label className="sr-only" htmlFor="signup-password">
              비밀번호
            </label>
            <PixelInput
              aria-describedby={
                fieldErrors.password ? "signup-error-message" : undefined
              }
              aria-invalid={Boolean(fieldErrors.password)}
              autoComplete="new-password"
              className="h-[clamp(1.55rem,7vw,2.625rem)] border-0 bg-hae-paper/90 px-[clamp(0.75rem,2.6vw,1rem)] focus:ring-hae-gold/45"
              disabled={isSubmitting}
              id="signup-password"
              maxLength={signupFieldConstraints.password.maxLength}
              minLength={signupFieldConstraints.password.minLength}
              name="password"
              onChange={(event) => setPassword(event.currentTarget.value)}
              placeholder="비밀번호"
              type="password"
              value={password}
            />

            <label className="sr-only" htmlFor="signup-nickname">
              활동명
            </label>
            <PixelInput
              aria-describedby={
                fieldErrors.nickname ? "signup-error-message" : undefined
              }
              aria-invalid={Boolean(fieldErrors.nickname)}
              autoComplete="nickname"
              className="h-[clamp(1.55rem,7vw,2.625rem)] border-0 bg-hae-paper/90 px-[clamp(0.75rem,2.6vw,1rem)] focus:ring-hae-gold/45"
              disabled={isSubmitting}
              id="signup-nickname"
              maxLength={signupFieldConstraints.nickname.maxLength}
              minLength={signupFieldConstraints.nickname.minLength}
              name="nickname"
              onChange={(event) => setNickname(event.currentTarget.value)}
              pattern={signupFieldConstraints.nickname.pattern}
              placeholder="활동명"
              type="text"
              value={nickname}
            />
          </div>

          <div className="absolute inset-x-[8%] top-[61%] grid min-h-9 place-items-center sm:inset-x-[13%]">
            {visibleError ? (
              <p
                className="rounded border border-hae-ember/35 bg-hae-ember/12 px-3 py-2 text-center text-sm font-medium text-hae-paper"
                id="signup-error-message"
                role="alert"
              >
                {visibleError}
              </p>
            ) : null}
          </div>

          <div className="absolute inset-x-0 top-[75%] flex flex-col items-center [&>button+button]:-mt-4 sm:top-[68%]">
            <ImageButton
              backgroundImage={imageButtonBg}
              className="w-[55%] max-w-[306px]"
              disabled={disabled || isSubmitting || !canSubmitSignup}
              disabledBackgroundImage={imageButtonDisabledBg}
              type="submit"
            >
              {isSubmitting ? "가입 중" : "가입하기"}
            </ImageButton>
            <DialogClose asChild>
              <ImageButton
                backgroundImage={imageButtonBg}
                className="w-[55%] max-w-[306px]"
                disabled={isSubmitting}
                disabledBackgroundImage={imageButtonDisabledBg}
                type="button"
              >
                닫기
              </ImageButton>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
