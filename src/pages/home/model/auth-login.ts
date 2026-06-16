import { authApi, ResponseError } from "@/shared/api";
import { saveLoginData } from "@/shared/auth";

export type LoginField = "account_id" | "password";

export type LoginFormValues = Record<LoginField, string>;

export type LoginFieldErrors = Partial<Record<LoginField, string>>;

export const loginFieldConstraints = {
  accountId: {
    minLength: 3,
    maxLength: 20,
    pattern: "^[A-Za-z0-9_]+$",
  },
  password: {
    minLength: 8,
    maxLength: 20,
  },
} as const;

const defaultErrorMessage = "로그인에 실패했습니다. 입력값을 확인해 주세요.";
const accountIdPattern = /^[A-Za-z0-9_]+$/;

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

export function validateLoginForm(values: LoginFormValues): LoginFieldErrors {
  const errors: LoginFieldErrors = {};

  if (!values.account_id) {
    errors.account_id = "계정 ID를 입력해 주세요.";
  } else if (
    values.account_id.length < loginFieldConstraints.accountId.minLength ||
    values.account_id.length > loginFieldConstraints.accountId.maxLength
  ) {
    errors.account_id = "계정 ID는 3자 이상 20자 이하로 입력해 주세요.";
  } else if (!accountIdPattern.test(values.account_id)) {
    errors.account_id = "계정 ID는 영문, 숫자, _만 사용할 수 있습니다.";
  }

  if (!values.password) {
    errors.password = "비밀번호를 입력해 주세요.";
  } else if (
    values.password.length < loginFieldConstraints.password.minLength ||
    values.password.length > loginFieldConstraints.password.maxLength
  ) {
    errors.password = "비밀번호는 8자 이상 20자 이하로 입력해 주세요.";
  }

  return errors;
}

export async function loginWithCredentials(values: LoginFormValues) {
  const loginResult = await authApi.beAuthLogin({
    loginRequest: values,
  });

  saveLoginData(loginResult.data);

  return loginResult.data;
}

export async function getLoginErrorMessage(error: unknown) {
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
