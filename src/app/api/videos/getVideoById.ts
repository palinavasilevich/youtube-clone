import { GetVideoByIdResponse } from "@/shared/types/api.types";
import prisma from "@/shared/lib/prisma";

type GetVideoByIdProps = {
  videoId: string;
};

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
      title: video.title,
      authorName: video.authorName,
      authorUrl: video.authorUrl,
    },
  };
}
