import { OEmbedVideoInfo } from "@/shared/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/video/[videoId]">,
) {
  const { videoId } = await ctx.params;

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    );
    const videoInfo = (await response.json()) as OEmbedVideoInfo;

    const authorUrl = videoInfo.author_url.split("/").at(-1);

    const result = {
      videoId,
      authorUrl,
      title: videoInfo.title,
      authorName: videoInfo.author_name,
    };

    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, data: null }, { status: 500 });
  }
}
