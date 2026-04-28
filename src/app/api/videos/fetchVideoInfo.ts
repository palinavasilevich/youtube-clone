type OEmbedResponse = {
  title: string;
  author_name: string;
  author_url: string;
};

export type VideoOEmbedInfo = {
  title: string;
  authorName: string;
  authorUrl: string;
  channelThumbnail: string | null;
};

async function fetchChannelThumbnail(
  authorUrl: string,
): Promise<string | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  const params = new URLSearchParams({
    part: "snippet",
    key: apiKey,
    maxResults: "1",
  });

  if (/^UC[\w-]{22}$/.test(authorUrl)) {
    params.set("id", authorUrl);
  } else if (authorUrl.startsWith("@")) {
    params.set("forHandle", authorUrl.replace(/^@/, ""));
  } else {
    params.set("forUsername", authorUrl);
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?${params}`,
    );
    if (!res.ok) return null;

    const data = await res.json();

    return (
      data.items?.[0]?.snippet?.thumbnails?.high?.url ||
      data.items?.[0]?.snippet?.thumbnails?.medium?.url ||
      data.items?.[0]?.snippet?.thumbnails?.default?.url ||
      null
    );
  } catch {
    return null;
  }
}

export async function fetchVideoInfo(
  videoId: string,
): Promise<VideoOEmbedInfo | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { signal: controller.signal },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as OEmbedResponse;
    const authorUrl = data.author_url.split("/").at(-1) ?? "";
    const channelThumbnail = await fetchChannelThumbnail(authorUrl);

    return {
      title: data.title,
      authorName: data.author_name,
      authorUrl,
      channelThumbnail,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
