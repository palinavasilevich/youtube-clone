import { PostVideoRequest, PostVideoResponse } from "@/shared/types/api.types";

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

const videoIds = new Set<string>([
  "hXYHZVMHec0",
  "3KZnAVWL5IQ",
  "oHAmjGo7h58",
  "At2gVjhf9Ac",
]);

export async function GET() {
  const videoPromises = [...videoIds].map(async (videoId) => {
    const rawResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    );

    const videoInfo = (await rawResponse.json()) as OEmbedVideoInfo;

    return {
      videoId,
      title: videoInfo.title,
      authorName: videoInfo.author_name,
      authorUrl: videoInfo.author_url,
    };
  });

  const result = await Promise.all(videoPromises);

  return Response.json({ ok: true, data: result });
}

export async function POST(request: Request): Promise<Response> {
  const body: PostVideoRequest = await request.json();

  if (videoIds.has(body.videoId)) {
    const res: PostVideoResponse = {
      ok: false,
      error: "The link to this video has already been added previously",
    };

    return Response.json(res, { status: 400 });
  }

  videoIds.add(body.videoId);

  const res: PostVideoResponse = { ok: true };

  return Response.json(res);
}
