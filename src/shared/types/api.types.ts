export type VideoInfo = {
  videoId: string;
  categoryId: string;
  title: string;
  description: string | null;
  views: number;
  authorName: string;
  authorUrl: string;
  channelThumbnail: string | null;
};

export type AuthUser = {
  id: string;
  username: string;
  avatar?: string;
};

export type UserInfoFromToken = AuthUser & { iat: number };
