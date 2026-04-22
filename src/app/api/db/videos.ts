type VideoId = string;

type VideoInfo = {
  id: VideoId;
  userId: string;
  categoryId: string;
};

declare global {
  var dbVideos: Map<VideoId, VideoInfo> | undefined;
}

export const videos =
  globalThis.dbVideos ||
  (globalThis.dbVideos = new Map<VideoId, VideoInfo>([
    ["hXYHZVMHec0", { id: "hXYHZVMHec0", userId: "1", categoryId: "science" }],
    ["3KZnAVWL5IQ", { id: "3KZnAVWL5IQ", userId: "2", categoryId: "science" }],
    ["oHAmjGo7h58", { id: "oHAmjGo7h58", userId: "2", categoryId: "news" }],
    ["At2gVjhf9Ac", { id: "At2gVjhf9Ac", userId: "3", categoryId: "games" }],
  ]));
