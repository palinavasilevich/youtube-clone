type YouTubeVideoItem = {
  snippet: {
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
  };
  statistics: {
    viewCount?: string;
    likeCount?: string;
  };
};

type YouTubeVideosResponse = {
  items?: YouTubeVideoItem[];
};

export type YouTubeFetchedInfo = {
  title: string;
  description: string;
  authorName: string;
  authorUrl: string;
  authorUsername: string | null;
  channelThumbnail: string | null;
  publishedAt: string;
  viewCount: number;
};

type ChannelData = {
  thumbnail: string | null;
  authorUsername: string | null;
};

async function fetchChannelData(channelId: string): Promise<ChannelData> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return { thumbnail: null, authorUsername: null };

  const params = new URLSearchParams({
    part: "snippet",
    id: channelId,
    key: apiKey,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?${params}`,
      { signal: controller.signal },
    );
    if (!res.ok) return { thumbnail: null, authorUsername: null };

    const data = await res.json();
    const snippet = data.items?.[0]?.snippet;

    return {
      thumbnail:
        snippet?.thumbnails?.high?.url ||
        snippet?.thumbnails?.medium?.url ||
        snippet?.thumbnails?.default?.url ||
        null,
      authorUsername: snippet?.customUrl ?? null,
    };
  } catch {
    return { thumbnail: null, authorUsername: null };
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchVideoInfo(
  videoId: string,
): Promise<YouTubeFetchedInfo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  const params = new URLSearchParams({
    part: "snippet,statistics",
    id: videoId,
    key: apiKey,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${params}`,
      { signal: controller.signal },
    );

    if (!res.ok) return null;

    const data = (await res.json()) as YouTubeVideosResponse;
    const item = data.items?.[0];
    if (!item) return null;

    const { snippet, statistics } = item;
    const { thumbnail: channelThumbnail, authorUsername } =
      await fetchChannelData(snippet.channelId);

    return {
      title: snippet.title,
      description: snippet.description,
      authorName: snippet.channelTitle,
      authorUrl: snippet.channelId,
      authorUsername,
      channelThumbnail,
      publishedAt: snippet.publishedAt,
      viewCount: parseInt(statistics.viewCount ?? "0", 10),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
