import { AuthApi, Configuration, GameApi } from "./generated";

export * from "./generated";

const apiConfiguration = new Configuration({
  basePath: "https://api.haejillyeok.com",
  credentials: "include",
});

export const authApi = new AuthApi(apiConfiguration);
export const gameApi = new GameApi(apiConfiguration);
