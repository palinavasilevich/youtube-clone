export type PostVideoRequest = {
  videoId: string;
};

export type PostVideoResponse = { ok: true } | { ok: false; error: string };
