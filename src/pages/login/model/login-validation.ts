export type LoginField = "account_id" | "nickname" | "password";

export type LoginFormValues = Record<LoginField, string>;

export type LoginFieldErrors = Partial<Record<LoginField, string>>;

export const loginFieldConstraints = {
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

const accountIdPattern = /^[A-Za-z0-9_]+$/;
const nicknamePattern = /^[가-힣A-Za-z0-9_]+$/;

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

  if (!values.nickname) {
    errors.nickname = "닉네임을 입력해 주세요.";
  } else if (
    values.nickname.length < loginFieldConstraints.nickname.minLength ||
    values.nickname.length > loginFieldConstraints.nickname.maxLength
  ) {
    errors.nickname = "닉네임은 3자 이상 20자 이하로 입력해 주세요.";
  } else if (!nicknamePattern.test(values.nickname)) {
    errors.nickname = "닉네임은 한글, 영문, 숫자, _만 사용할 수 있습니다.";
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
