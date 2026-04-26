type OEmbedResponse = {
  title: string;
  author_name: string;
  author_url: string;
};

export type VideoOEmbedInfo = {
  title: string;
  authorName: string;
  authorUrl: string;
};

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

    return {
      title: data.title,
      authorName: data.author_name,
      authorUrl: data.author_url.split("/").at(-1) ?? "",
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
