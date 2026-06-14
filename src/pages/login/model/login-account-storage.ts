const loginAccountIdStorageKey = "hae-login-account-id";

export function readLoginAccountId() {
  try {
    const accountId = localStorage.getItem(loginAccountIdStorageKey);
    return accountId && accountId.length > 0 ? accountId : null;
  } catch {
    return null;
  }
}

export function saveLoginAccountId(accountId: string) {
  try {
    localStorage.setItem(loginAccountIdStorageKey, accountId);
  } catch {
    return;
  }
}

export function clearLoginAccountId() {
  try {
    localStorage.removeItem(loginAccountIdStorageKey);
  } catch {
    return;
  }
}
