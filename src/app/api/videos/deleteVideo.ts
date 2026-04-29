"use server";

import { z } from "zod";
import prisma from "@/shared/lib/prisma";

type DeleteVideoProps = {
  userId: string;
  videoId: string;
};

type DeleteVideoResponse = { ok: true } | { ok: false; message: string };

const deleteVideoSchema = z.object({
  userId: z.string().min(1),
  videoId: z.string().min(1),
});

export async function deleteVideo(
  props: DeleteVideoProps,
): Promise<DeleteVideoResponse> {
  const parsed = deleteVideoSchema.safeParse(props);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid request body",
    };
  }

  const { videoId, userId } = parsed.data;

  try {
    const { count } = await prisma.video.deleteMany({
      where: { userId, youtubeId: videoId },
    });
    if (count === 0) {
      return { ok: false, message: "Video not found or access denied" };
    }
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Failed to delete video" };
  }

  return { ok: true };
}
