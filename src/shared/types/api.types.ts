export type OEmbedVideoInfo = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
};

export type Video = {
  videoId: string;
  title: string;
  authorName: string;
  authorUrl: string;
};

export type GetVideoByIdResponse = {
  ok: boolean;
  data: Video | null;
};

export type GetVideosResponse = {
  ok: boolean;
  data: Video[];
};

export type PostVideoRequest = {
  videoId: string;
};

export type PostVideoResponse = { ok: true } | { ok: false; error: string };
