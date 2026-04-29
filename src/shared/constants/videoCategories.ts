export const CATEGORIES = [
  "movies",
  "music",
  "travel",
  "education",
  "science",
  "entertainment",
  "sport",
  "gaming",
] as const;

export const DEFAULT_CATEGORY = { id: "all", title: "All videos" } as const;

export const VIDEO_CATEGORIES: VideoCategory[] = [
  { id: "movies", title: "Movies" },
  { id: "music", title: "Music" },
  { id: "travel", title: "Travel & Events" },
  { id: "education", title: "Education" },
  { id: "science", title: "Science & Technology" },
  { id: "entertainment", title: "Entertainment" },
  { id: "sport", title: "Sport" },
  { id: "gaming", title: "Gaming" },
];

export type VideoCategoryId = (typeof CATEGORIES)[number];

export type VideoCategory = {
  id: VideoCategoryId;
  title: string;
};
