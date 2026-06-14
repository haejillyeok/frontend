"use client";

import { useRouter } from "next/navigation";
import type { SyntheticEvent } from "react";
import { useEffect, useState } from "react";
import { authApi, ResponseError } from "@/shared/api";
import { saveLoginData } from "@/shared/auth";
import { Button, Checkbox } from "@/shared/ui";
import { PublicHeader } from "@/widgets/public-header";
import {
  clearLoginAccountId,
  readLoginAccountId,
  saveLoginAccountId,
} from "../model/login-account-storage";
import {
  type LoginFieldErrors,
  loginFieldConstraints,
  validateLoginForm,
} from "../model/login-validation";

const defaultErrorMessage = "로그인에 실패했습니다. 입력값을 확인해 주세요.";

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

async function getLoginErrorMessage(error: unknown) {
  if (error instanceof ResponseError) {
    try {
      const body = asRecord(await error.response.json());
      const errorInfo = asRecord(body?.error);
      const message = errorInfo?.message;

      if (typeof message === "string" && message.trim().length > 0) {
        return message;
      }
    } catch {
      return defaultErrorMessage;
    }
  }

  return defaultErrorMessage;
}

export function LoginPage() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [rememberAccountId, setRememberAccountId] = useState(false);
  const accountIdDescription = fieldErrors.account_id
    ? "account_id-hint account_id-error"
    : "account_id-hint";
  const passwordDescription = fieldErrors.password
    ? "password-hint password-error"
    : "password-hint";

  useEffect(() => {
    const savedAccountId = readLoginAccountId();

    if (savedAccountId) {
      setAccountId(savedAccountId);
      setRememberAccountId(true);
    }
  }, []);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const accountId = String(formData.get("account_id") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const nextFieldErrors = validateLoginForm({
      account_id: accountId,
      password,
    });

    setFieldErrors(nextFieldErrors);
    setSubmitError(null);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const loginResult = await authApi.beAuthLogin({
        loginRequest: {
          account_id: accountId,
          password,
        },
      });

      if (rememberAccountId) {
        saveLoginAccountId(accountId);
      } else {
        clearLoginAccountId();
      }

      saveLoginData(loginResult.data);
      router.push("/play");
    } catch (error) {
      setSubmitError(await getLoginErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh w-full overflow-hidden bg-hae-ink px-5 py-6 text-hae-paper sm:px-8 sm:py-10">
      <div className="absolute inset-0 [background:var(--hae-gradient-sunset)]" />
      <div className="absolute inset-x-0 bottom-[27%] h-px bg-gradient-to-r from-transparent via-hae-gold/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[34%] [background:var(--hae-gradient-nightfall)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col">
        <PublicHeader authLinks="signup" />

        <section className="grid flex-1 place-items-center py-16">
          <form
            className="w-full max-w-md rounded-lg border border-hae-paper/12 bg-hae-ink/72 p-5 shadow-[0_28px_80px_rgb(16_18_27/0.32)] backdrop-blur-md sm:p-6"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="space-y-1">
              <h2 className="text-xl font-black text-hae-paper">로그인</h2>
              <p className="text-sm leading-6 text-hae-paper/62">
                계정 ID와 비밀번호를 입력해 주세요.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label
                  className="pb-px text-sm font-bold text-hae-paper"
                  htmlFor="account_id"
                >
                  계정 ID
                </label>
                <input
                  aria-describedby={accountIdDescription}
                  aria-invalid={Boolean(fieldErrors.account_id)}
                  autoComplete="username"
                  className="h-11 w-full rounded-md border border-hae-paper/14 bg-hae-paper/8 px-3 text-sm font-medium text-hae-paper outline-none transition placeholder:text-hae-paper/34 focus:border-hae-gold focus:ring-3 focus:ring-hae-gold/24 aria-invalid:border-hae-ember aria-invalid:ring-hae-ember/20"
                  id="account_id"
                  maxLength={loginFieldConstraints.accountId.maxLength}
                  minLength={loginFieldConstraints.accountId.minLength}
                  name="account_id"
                  onChange={(event) => setAccountId(event.currentTarget.value)}
                  pattern={loginFieldConstraints.accountId.pattern}
                  placeholder="sunset-player"
                  type="text"
                  value={accountId}
                />
                <p className="text-xs text-hae-paper/52" id="account_id-hint">
                  3~20자, 영문/숫자/_ 사용 가능
                </p>
                {fieldErrors.account_id ? (
                  <p className="text-sm text-hae-ember" id="account_id-error">
                    {fieldErrors.account_id}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  className="pb-px text-sm font-bold text-hae-paper"
                  htmlFor="password"
                >
                  비밀번호
                </label>
                <input
                  aria-describedby={passwordDescription}
                  aria-invalid={Boolean(fieldErrors.password)}
                  autoComplete="current-password"
                  className="h-11 w-full rounded-md border border-hae-paper/14 bg-hae-paper/8 px-3 text-sm font-medium text-hae-paper outline-none transition placeholder:text-hae-paper/34 focus:border-hae-gold focus:ring-3 focus:ring-hae-gold/24 aria-invalid:border-hae-ember aria-invalid:ring-hae-ember/20"
                  id="password"
                  maxLength={loginFieldConstraints.password.maxLength}
                  minLength={loginFieldConstraints.password.minLength}
                  name="password"
                  placeholder="비밀번호"
                  type="password"
                />
                <p className="text-xs text-hae-paper/52" id="password-hint">
                  8~20자
                </p>
                {fieldErrors.password ? (
                  <p className="text-sm text-hae-ember" id="password-error">
                    {fieldErrors.password}
                  </p>
                ) : null}
              </div>
            </div>

            {submitError ? (
              <p
                className="mt-5 rounded-md border border-hae-ember/35 bg-hae-ember/12 px-3 py-2 text-sm font-medium text-hae-paper"
                role="alert"
              >
                {submitError}
              </p>
            ) : null}

            <div className="mt-5 flex items-center gap-2">
              <Checkbox
                checked={rememberAccountId}
                className="border-hae-paper/24 bg-hae-paper/8 text-hae-ink focus-visible:border-hae-gold focus-visible:ring-hae-gold/30 data-[state=checked]:border-hae-gold data-[state=checked]:bg-hae-gold data-[state=checked]:text-hae-ink"
                disabled={isSubmitting}
                id="remember_account_id"
                onCheckedChange={(checked) =>
                  setRememberAccountId(checked === true)
                }
              />
              <label
                className="cursor-pointer text-sm font-medium text-hae-paper/72"
                htmlFor="remember_account_id"
              >
                ID 기억하기
              </label>
            </div>

            <Button
              className="mt-4 w-full cursor-pointer bg-hae-gold font-black text-hae-ink shadow-[0_18px_52px_rgba(255,209,102,0.18)] hover:bg-hae-paper focus-visible:border-hae-gold focus-visible:ring-hae-gold/40"
              disabled={isSubmitting}
              size="lg"
              type="submit"
            >
              {isSubmitting ? "로그인 중" : "로그인"}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
