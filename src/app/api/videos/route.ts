import { z } from "zod";

import { videos } from "@/app/api/db/videos";

const postVideoSchema = z.object({
  userId: z.string().min(1),
  videoId: z.string().min(1),
  categoryId: z.string().min(1),
});

type PostVideoResponse = { ok: true } | { ok: false; message: string };

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

  return Response.json(res, { status: 201 });
}
