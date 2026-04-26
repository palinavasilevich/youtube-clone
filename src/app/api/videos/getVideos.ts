"use server";

import { GetVideosResponse } from "@/shared/types/api.types";
import prisma from "@/shared/lib/prisma";

type GetVideosProps = {
  userId?: string;
  categoryId?: string;
};

export async function getVideos({
  userId,
  categoryId,
}: GetVideosProps = {}): Promise<GetVideosResponse> {
  const videos = await prisma.video.findMany({
    where: {
      ...(userId ? { userId } : {}),
      ...(categoryId ? { categoryId } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = Array.from(
    new Set(
      videos.map((v) => v.categoryId).filter((c): c is string => c !== null),
    ),
  );

  const data = videos
    .filter((v) => v.title && v.authorName && v.authorUrl && v.categoryId)
    .map((v) => ({
      videoId: v.youtubeId,
      categoryId: v.categoryId!,
      title: v.title!,
      authorName: v.authorName!,
      authorUrl: v.authorUrl!,
    }));

  return { ok: true, data, categories };
}
