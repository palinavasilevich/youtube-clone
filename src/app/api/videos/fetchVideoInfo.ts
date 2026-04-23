import { Video } from "@/shared/types/api.types";

type OEmbedVideoInfo = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
};

type FetchVideoInfoProps = {
  videoId: string;
  categoryId: string;
};

export async function fetchVideoInfo({
  videoId,
  categoryId,
}: FetchVideoInfoProps): Promise<Video | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const rawResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { signal: controller.signal },
    );

    if (!rawResponse.ok) return null;

    const videoInfo = (await rawResponse.json()) as OEmbedVideoInfo;
    const authorUrl = videoInfo.author_url.split("/").at(-1) || "";

    return {
      videoId,
      categoryId,
      title: videoInfo.title,
      authorName: videoInfo.author_name,
      authorUrl,
    };
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
