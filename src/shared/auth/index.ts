const loginDataStorageKey = "hae-login-data";

export function saveLoginData(loginData: unknown) {
  sessionStorage.setItem(
    loginDataStorageKey,
    JSON.stringify(loginData, null, 2),
  );
}

export function readLoginData() {
  return sessionStorage.getItem(loginDataStorageKey);
}
