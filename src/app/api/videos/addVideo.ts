"use server";

import { z } from "zod";
import { getVideosData, saveVideos } from "../db/blobVideos";

type AddVideoProps = {
  userId: string;
  videoId: string;
  categoryId: string;
};

type PostVideoResponse = { ok: true } | { ok: false; message: string };

const postVideoSchema = z.object({
  userId: z.string().min(1),
  videoId: z.string().min(1),
  categoryId: z.string().min(1),
});

export async function addVideo(
  props: AddVideoProps,
): Promise<PostVideoResponse> {
  const parsed = postVideoSchema.safeParse(props);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid request body",
    };
  }

  const videos = await getVideosData();

  const { videoId, userId, categoryId } = parsed.data;

  if (videos.has(videoId)) {
    return {
      ok: false,
      message: "The link to this video has already been added previously",
    };
  }

  videos.set(videoId, { id: videoId, userId, categoryId });
  await saveVideos(videos);

  return { ok: true };
}
