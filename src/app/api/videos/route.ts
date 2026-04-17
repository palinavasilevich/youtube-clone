import { videos } from "@/db/videos";
import {
  OEmbedVideoInfo,
  PostVideoRequest,
  PostVideoResponse,
} from "@/shared/types/api.types";

export async function GET() {
  try {
    const videoPromises = [...videos].map(async (video) => {
      const videoId = video[1].id;
      const rawResponse = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      );

      const videoInfo = (await rawResponse.json()) as OEmbedVideoInfo;
      const authorUrl = videoInfo.author_url.split("/").at(-1);

      return {
        videoId,
        title: videoInfo.title,
        authorName: videoInfo.author_name,
        authorUrl,
      };
    });

    const result = await Promise.all(videoPromises);

    return Response.json({ ok: true, data: result });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, data: [] }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  const { videoId }: PostVideoRequest = await request.json();

  if (videos.has(videoId)) {
    const res: PostVideoResponse = {
      ok: false,
      error: "The link to this video has already been added previously",
    };

    return Response.json(res, { status: 400 });
  }

  videos.set(videoId, { id: videoId });

  const res: PostVideoResponse = { ok: true };

  return Response.json(res);
}
