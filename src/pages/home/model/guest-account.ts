const guestAccountIdPrefix = "guest_";
const guestAccountIdAlphabet =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const guestAccountIdRandomLength = 10;

export function createGuestAccountId() {
  const bytes = new Uint8Array(guestAccountIdRandomLength);
  crypto.getRandomValues(bytes);

  const randomPart = Array.from(
    bytes,
    (byte) => guestAccountIdAlphabet[byte % guestAccountIdAlphabet.length],
  ).join("");

  return `${guestAccountIdPrefix}${randomPart}`;
}

export function isReservedAccountId(accountId: string) {
  return accountId.trim().toLowerCase().startsWith(guestAccountIdPrefix);
}
