"use server";

import { z } from "zod";
import prisma from "@/shared/lib/prisma";
import { fetchVideoInfo } from "./fetchVideoInfo";
import {
  VideoCategoryId,
  CATEGORIES,
} from "@/shared/constants/videoCategories";

type AddVideoProps = {
  userId: string;
  videoId: string;
  categoryId: VideoCategoryId;
};

type PostVideoResponse = { ok: true } | { ok: false; message: string };

const postVideoSchema = z.object({
  userId: z.string().min(1),
  videoId: z.string().min(1),
  categoryId: z.enum(CATEGORIES),
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

  const { videoId, userId, categoryId } = parsed.data;

  const existing = await prisma.video.findUnique({
    where: { youtubeId: videoId },
  });

  if (existing) {
    return {
      ok: false,
      message: "The link to this video has already been added previously",
    };
  }

  const videoInfo = await fetchVideoInfo(videoId);

  if (!videoInfo) {
    return {
      ok: false,
      message: "Could not fetch video information. Please check the video ID.",
    };
  }

  await prisma.video.create({
    data: {
      youtubeId: videoId,
      userId,
      categoryId,
      title: videoInfo.title,
      authorName: videoInfo.authorName,
      authorUrl: videoInfo.authorUrl,
      channelThumbnail: videoInfo.channelThumbnail,
    },
  });

  return { ok: true };
}
