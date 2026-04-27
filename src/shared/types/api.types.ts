export type VideoInfo = {
  videoId: string;
  categoryId: string;
  title: string;
  authorName: string;
  authorUrl: string;
};

export type AuthUser = {
  id: string;
  username: string;
  avatar?: string;
};

export type UserInfoFromToken = AuthUser & { iat: number };
