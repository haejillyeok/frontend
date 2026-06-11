import { AuthApi, Configuration } from "./generated";

export * from "./generated";

const apiConfiguration = new Configuration({
  basePath: "https://api.haejillyeok.com",
  credentials: "include",
});

export const authApi = new AuthApi(apiConfiguration);
