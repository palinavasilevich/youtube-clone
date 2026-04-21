import { videos } from "@/app/api/db/videos";
import { OEmbedVideoInfo } from "@/shared/types/api.types";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/video/[videoId]">,
) {
  const { videoId } = await ctx.params;

  if (!videos.has(videoId)) {
    return Response.json({ ok: false, data: null }, { status: 404 });
  }

  const categoryId = videos.get(videoId)!.categoryId;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      { signal: controller.signal },
    );
    const videoInfo = (await response.json()) as OEmbedVideoInfo;

    const authorUrl = videoInfo.author_url.split("/").at(-1);

    const result = {
      videoId,
      categoryId,
      authorUrl,
      title: videoInfo.title,
      authorName: videoInfo.author_name,
    };

    return Response.json({ ok: true, data: result });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, data: null }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
