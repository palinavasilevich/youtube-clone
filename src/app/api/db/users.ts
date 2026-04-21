type UserId = string;

type UserInfo = { id: UserId; login: string; password: string };

export const users = new Map<UserId, UserInfo>();
