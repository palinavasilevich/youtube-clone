export type VideoInfo = {
  videoId: string;
  categoryId: string;
  title: string;
  authorName: string;
  authorUrl: string;
};

export type GetVideosResponse =
  | { ok: true; data: VideoInfo[]; categories: string[] }
  | { ok: false; data: null };

export type GetVideoByIdResponse =
  | { ok: true; data: Omit<VideoInfo, "categoryId"> }
  | { ok: false; data: null };

export type AuthUser = {
  id: string;
  username: string;
};

export type UserInfoFromToken = AuthUser & { iat: number };

export type GetUserResponse =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };
