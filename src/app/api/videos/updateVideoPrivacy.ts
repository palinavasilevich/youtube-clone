"use server";

import { z } from "zod";
import prisma from "@/shared/lib/prisma";

type UpdateVideoPrivacyProps = {
  userId: string;
  videoId: string;
  isPrivate: boolean;
};

type UpdateVideoPrivacyResponse = { ok: true } | { ok: false; message: string };

const schema = z.object({
  userId: z.string().min(1),
  videoId: z.string().min(1),
  isPrivate: z.boolean(),
});

export async function updateVideoPrivacy(
  props: UpdateVideoPrivacyProps,
): Promise<UpdateVideoPrivacyResponse> {
  const parsed = schema.safeParse(props);

  if (!parsed.success) {
    return {
      ok: false,
      message: parsed.error.issues[0]?.message ?? "Invalid request",
    };
  }

  const { userId, videoId, isPrivate } = parsed.data;

  try {
    const { count } = await prisma.video.updateMany({
      where: { userId, youtubeId: videoId },
      data: { isPrivate },
    });

    if (count === 0) {
      return { ok: false, message: "Video not found or access denied" };
    }
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Failed to update video" };
  }

  return { ok: true };
}
