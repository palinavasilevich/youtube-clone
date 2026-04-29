import { VideoInfo } from "@/shared/types/api.types";
import prisma from "@/shared/lib/prisma";

type GetVideoByIdProps = {
  videoId: string;
};

type GetVideoByIdResponse =
  | { ok: true; data: Omit<VideoInfo, "categoryId"> }
  | { ok: false; data: null };

export async function getVideoById({
  videoId,
}: GetVideoByIdProps): Promise<GetVideoByIdResponse> {
  const video = await prisma.video.findUnique({
    where: { youtubeId: videoId },
  });

  if (!video || !video.title || !video.authorName || !video.authorUrl) {
    return { ok: false, data: null };
  }

  return {
    ok: true,
    data: {
      videoId: video.youtubeId,
      ownerId: video.userId,
      title: video.title,
      description: video.description,
      views: video.views,
      authorName: video.authorName,
      authorUrl: video.authorUrl,
      authorUsername: video.authorUsername ?? null,
      channelThumbnail: video.channelThumbnail,
      publishedAt: video.publishedAt,
      isPrivate: video.isPrivate,
    },
  };
}
