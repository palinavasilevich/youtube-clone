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
  currentUserId?: string;
};

type GetVideosResponse =
  | { ok: true; data: VideoInfo[]; categories: VideoCategory[] }
  | { ok: false; data: null };

export async function getVideos({
  userId,
  categoryId,
  currentUserId,
}: GetVideosProps = {}): Promise<GetVideosResponse> {
  try {
    const privacyFilter = currentUserId
      ? { OR: [{ isPrivate: false }, { userId: currentUserId }] }
      : { isPrivate: false };

    const [videos, categoryRows] = await Promise.all([
      prisma.video.findMany({
        where: { userId, categoryId, ...privacyFilter },
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
      ownerId: v.userId,
      categoryId: v.categoryId,
      title: v.title,
      description: v.description,
      views: v.views,
      authorName: v.authorName,
      authorUrl: v.authorUrl,
      authorUsername: v.authorUsername ?? null,
      channelThumbnail: v.channelThumbnail,
      publishedAt: v.publishedAt,
      isPrivate: v.isPrivate,
    }));

    return { ok: true, data, categories };
  } catch {
    return { ok: false, data: null };
  }
}
