export type Video = {
  videoId: string;
  categoryId: string;
  title: string;
  authorName: string;
  authorUrl: string;
};

export type GetVideosResponse = {
  ok: boolean;
  data: Video[];
};

export type PostVideoRequest = {
  videoId: string;
};

export type PostVideoResponse = { ok: true } | { ok: false; error: string };
