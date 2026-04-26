export const CATEGORIES = [
  "science",
  "music",
  "games",
  "news",
  "fun",
  "sport",
] as const;

export const DEFAULT_CATEGORY = { id: "all", title: "All videos" } as const;

export const VIDEO_CATEGORIES: {
  id: (typeof CATEGORIES)[number];
  title: string;
}[] = [
  { id: "games", title: "Games" },
  { id: "news", title: "News" },
  { id: "fun", title: "Fun" },
  { id: "science", title: "Science" },
  { id: "sport", title: "Sport" },
  { id: "music", title: "Music" },
];

export type VideoCategory = (typeof CATEGORIES)[number];
