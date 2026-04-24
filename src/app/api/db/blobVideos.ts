import { del, get, list, put } from "@vercel/blob";

type VideoId = string;

type VideoInfo = {
  id: VideoId;
  userId: string;
  categoryId: string;
};

const VIDEOS_BLOB_PREFIX = "db/videos";

async function getLatestBlobKey(prefix: string): Promise<string | null> {
  const { blobs } = await list({ prefix });

  if (blobs.length === 0) return null;

  const sortedBlobs = blobs.sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  );

  return sortedBlobs[0].pathname;
}

async function getLatestVideosKey(): Promise<string | null> {
  return getLatestBlobKey(VIDEOS_BLOB_PREFIX);
}

export async function getVideosData(): Promise<Map<VideoId, VideoInfo>> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return initializeVideos();
  }

  try {
    const latestKey = await getLatestVideosKey();

    if (!latestKey) {
      const def = initializeVideos();
      await saveVideos(def);
      return def;
    }

    const result = await get(latestKey, { access: "private" });

    if (!result || result.statusCode !== 200 || !result.stream) {
      const def = initializeVideos();
      await saveVideos(def);
      return def;
    }

    const data = await new Response(result.stream).json();
    return new Map(Object.entries(data));
  } catch (e) {
    if (e instanceof Error && e.message.includes("Access denied")) {
      console.warn(
        "Vercel Blob: invalid or missing BLOB_READ_WRITE_TOKEN — using default videos",
      );
    } else {
      console.error("getVideosData error:", e);
    }
    return initializeVideos();
  }
}

export async function saveVideos(
  videos: Map<VideoId, VideoInfo>,
): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return;

  const data = Object.fromEntries(videos);

  try {
    const { blobs } = await list({ prefix: VIDEOS_BLOB_PREFIX });
    for (const blob of blobs) {
      await del(blob.url);
    }
  } catch (e) {
    console.error("Error deleting old versions:", e);
  }

  const timestamp = Date.now();
  const newKey = `${VIDEOS_BLOB_PREFIX}-${timestamp}.json`;

  await put(newKey, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
}

function initializeVideos(): Map<VideoId, VideoInfo> {
  return new Map<VideoId, VideoInfo>([
    ["hXYHZVMHec0", { id: "hXYHZVMHec0", userId: "0", categoryId: "science" }],
    ["3KZnAVWL5IQ", { id: "3KZnAVWL5IQ", userId: "0", categoryId: "science" }],
    ["dQw4w9WgXcQ", { id: "dQw4w9WgXcQ", userId: "0", categoryId: "music" }],
    ["oHAmjGo7h58", { id: "oHAmjGo7h58", userId: "0", categoryId: "news" }],
    ["At2gVjhf9Ac", { id: "At2gVjhf9Ac", userId: "0", categoryId: "games" }],
    ["ssoCumPEH0g", { id: "ssoCumPEH0g", userId: "0", categoryId: "fun" }],
    ["BXv8NUSOZko", { id: "BXv8NUSOZko", userId: "0", categoryId: "fun" }],
  ]);
}
