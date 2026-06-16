import { ResponseError } from "@/shared/api";

import { isReservedAccountId } from "./guest-account";

export type SignupField = "account_id" | "nickname" | "password";

export type SignupFormValues = Record<SignupField, string>;

export type SignupFieldErrors = Partial<Record<SignupField, string>>;

export const signupFieldConstraints = {
  accountId: {
    minLength: 3,
    maxLength: 20,
    pattern: "^[A-Za-z0-9_]+$",
  },
  nickname: {
    minLength: 3,
    maxLength: 20,
    pattern: "^[가-힣A-Za-z0-9_]+$",
  },
  password: {
    minLength: 8,
    maxLength: 20,
  },
} as const;

const defaultErrorMessage = "회원가입에 실패했습니다. 입력값을 확인해 주세요.";
const accountIdPattern = /^[A-Za-z0-9_]+$/;
const nicknamePattern = /^[가-힣A-Za-z0-9_]+$/;

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

export function validateSignupForm(
  values: SignupFormValues,
): SignupFieldErrors {
  const errors: SignupFieldErrors = {};

  if (!values.account_id) {
    errors.account_id = "계정을 입력해 주세요.";
  } else if (
    values.account_id.length < signupFieldConstraints.accountId.minLength ||
    values.account_id.length > signupFieldConstraints.accountId.maxLength
  ) {
    errors.account_id = "계정은 3자 이상 20자 이하로 입력해 주세요.";
  } else if (!accountIdPattern.test(values.account_id)) {
    errors.account_id = "계정은 영문, 숫자, _만 사용할 수 있습니다.";
  } else if (isReservedAccountId(values.account_id)) {
    errors.account_id = "guest_로 시작하는 계정은 사용할 수 없습니다.";
  }

  if (!values.password) {
    errors.password = "비밀번호를 입력해 주세요.";
  } else if (
    values.password.length < signupFieldConstraints.password.minLength ||
    values.password.length > signupFieldConstraints.password.maxLength
  ) {
    errors.password = "비밀번호는 8자 이상 20자 이하로 입력해 주세요.";
  }

  if (!values.nickname) {
    errors.nickname = "활동명을 입력해 주세요.";
  } else if (
    values.nickname.length < signupFieldConstraints.nickname.minLength ||
    values.nickname.length > signupFieldConstraints.nickname.maxLength
  ) {
    errors.nickname = "활동명은 3자 이상 20자 이하로 입력해 주세요.";
  } else if (!nicknamePattern.test(values.nickname)) {
    errors.nickname = "활동명은 한글, 영문, 숫자, _만 사용할 수 있습니다.";
  }

  return errors;
}

export async function getSignupErrorMessage(error: unknown) {
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
