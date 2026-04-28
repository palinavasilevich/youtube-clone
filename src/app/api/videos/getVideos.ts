"use server";

import { VideoInfo } from "@/shared/types/api.types";
import prisma from "@/shared/lib/prisma";
import {
  VIDEO_CATEGORIES,
  VideoCategory,
} from "@/shared/constants/videoCategories";

type GetVideosProps = {
  userId?: string;
  categoryId?: string;
};

type GetVideosResponse =
  | { ok: true; data: VideoInfo[]; categories: VideoCategory[] }
  | { ok: false; data: null };

export async function getVideos({
  userId,
  categoryId,
}: GetVideosProps = {}): Promise<GetVideosResponse> {
  try {
    const [videos, categoryRows] = await Promise.all([
      prisma.video.findMany({
        where: { userId, categoryId },
        orderBy: { createdAt: "desc" },
      }),
      categoryId
        ? prisma.video.findMany({
            where: { userId },
            select: { categoryId: true },
            distinct: ["categoryId"],
          })
        : Promise.resolve(null),
    ]);

    const usedCategoryIds = (categoryRows ?? videos).map((v) => v.categoryId);

    const categories = VIDEO_CATEGORIES.filter(({ id }) =>
      usedCategoryIds.includes(id),
    );

    const data: VideoInfo[] = videos.map((v) => ({
      videoId: v.youtubeId,
      categoryId: v.categoryId,
      title: v.title,
      authorName: v.authorName,
      authorUrl: v.authorUrl,
      channelThumbnail: v.channelThumbnail,
    }));

    return { ok: true, data, categories };
  } catch {
    return { ok: false, data: null };
  }
}
