type VideoData = {
  userId: string;
  categoryId: string;
};

export const videosData = new Map<string, VideoData>([
  ["hXYHZVMHec0", { userId: "1", categoryId: "science" }],
  ["3KZnAVWL5IQ", { userId: "2", categoryId: "fun" }],
  ["oHAmjGo7h58", { userId: "2", categoryId: "news" }],
  ["At2gVjhf9Ac", { userId: "3", categoryId: "games" }],
]);
