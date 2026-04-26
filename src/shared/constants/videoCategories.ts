export const CATEGORIES = [
  "science",
  "music",
  "games",
  "news",
  "fun",
  "sport",
] as const;

export const DEFAULT_CATEGORY = { id: "all", title: "All videos" } as const;

export const VIDEO_CATEGORIES: VideoCategory[] = [
  { id: "games", title: "Games" },
  { id: "news", title: "News" },
  { id: "fun", title: "Fun" },
  { id: "science", title: "Science" },
  { id: "sport", title: "Sport" },
  { id: "music", title: "Music" },
];

export type VideoCategoryId = (typeof CATEGORIES)[number];

export type VideoCategory = {
  id: VideoCategoryId;
  title: string;
};
