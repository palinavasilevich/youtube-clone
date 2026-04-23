// export type Video = {
//   videoId: string;
//   categoryId: string;
//   title: string;
//   authorName: string;
//   authorUrl: string;
// };

// export type GetVideosResponse = {
//   ok: boolean;
//   data: Video[];
//   categories: string[];
// };

// export type GetVideoByIdResponse = {
//   ok: boolean;
//   data: Omit<Video, "categoryId"> | null;
// };

// export type AuthUser = {
//   id: string;
//   username: string;
// };

// export type UserInfoFromToken = AuthUser & { iat: number };

// export type GetUserResponse =
//   | { ok: true; user: AuthUser }
//   | { ok: false; message: string };

export type Video = {
  videoId: string;
  categoryId: string;
  title: string;
  authorName: string;
  authorUrl: string;
};

export type GetVideosResponse =
  | { ok: true; data: Video[]; categories: string[] }
  | { ok: false; data: null };

export type GetVideoByIdResponse =
  | { ok: true; data: Omit<Video, "categoryId"> }
  | { ok: false; data: null };

export type AuthUser = {
  id: string;
  username: string;
};

export type UserInfoFromToken = AuthUser & { iat: number };

export type GetUserResponse =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };
