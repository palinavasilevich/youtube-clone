type UserLogin = string;

type UserInfo = { id: string; login: string; password: string };

export type User = {
  id: string;
  login: string;
};

export const users = new Map<UserLogin, UserInfo>();
