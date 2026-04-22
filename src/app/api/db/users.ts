type UserId = string;

type UserInfo = { id: UserId; username: string; password: string };

export type UserInfoFromToken = {
  id: UserInfo["id"];
  username: string;
  iat: number;
};

export const users =
  globalThis.dbUsers || (globalThis.dbUsers = new Map<UserId, UserInfo>());
