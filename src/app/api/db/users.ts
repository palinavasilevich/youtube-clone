type UserInfo = { id: string; username: string; password: string };

declare global {
  var dbUsers: Map<string, UserInfo> | undefined;
}

export const users =
  globalThis.dbUsers || (globalThis.dbUsers = new Map<string, UserInfo>());
