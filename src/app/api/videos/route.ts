import { z } from "zod";

import { videos } from "@/app/api/db/videos";
import { OEmbedVideoInfo } from "@/shared/types/api.types";

const postVideoSchema = z.object({
  userId: z.string().min(1),
  videoId: z.string().min(1),
  categoryId: z.string().min(1),
});

type PostVideoResponse = { ok: true } | { ok: false; message: string };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userIdParam = searchParams.get("userId");
  const categoryIdParam = searchParams.get("categoryId");

  try {
    const categories = Array.from(
      new Set([...videos].map((data) => data[1].categoryId)),
    );

    const videoPromises = [...videos]
      .filter((data) => (userIdParam ? data[1].userId === userIdParam : true))
      .filter((data) =>
        categoryIdParam ? data[1].categoryId === categoryIdParam : true,
      )
      .map(async (video) => {
        const videoId = video[0];
        const categoryId = video[1].categoryId;

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        try {
          const rawResponse = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
            { signal: controller.signal },
          );

          const videoInfo = (await rawResponse.json()) as OEmbedVideoInfo;
          const authorUrl = videoInfo.author_url.split("/").at(-1);

          return {
            videoId,
            categoryId,
            title: videoInfo.title,
            authorName: videoInfo.author_name,
            authorUrl,
          };
        } finally {
          clearTimeout(timeout);
        }
      });

    const result = (await Promise.allSettled(videoPromises)).flatMap((r) =>
      r.status === "fulfilled" ? [r.value] : [],
    );

    return Response.json({ ok: true, data: result, categories });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, data: [] }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<Response> {
  const parsed = postVideoSchema.safeParse(await request.json());

  if (!parsed.success) {
    const res: PostVideoResponse = {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid request body",
    };

    return Response.json(res, { status: 400 });
  }

  const { videoId, userId, categoryId } = parsed.data;

  if (videos.has(videoId)) {
    const res: PostVideoResponse = {
      ok: false,
      message: "The link to this video has already been added previously",
    };

    return Response.json(res, { status: 400 });
  }

  videos.set(videoId, { id: videoId, userId, categoryId });

  const res: PostVideoResponse = { ok: true };

  return Response.json(res);
}
