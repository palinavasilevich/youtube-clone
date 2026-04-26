export type VideoInfo = {
  videoId: string;
  categoryId: string;
  title: string;
  authorName: string;
  authorUrl: string;
};

export type GetVideoByIdResponse =
  | { ok: true; data: Omit<VideoInfo, "categoryId"> }
  | { ok: false; data: null };

export type AuthUser = {
  id: string;
  username: string;
  avatar?: string;
};

export type UserInfoFromToken = AuthUser & { iat: number };

export type GetUserResponse =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };
