import prisma from "@/shared/lib/prisma";

import { GetVideosResponse } from "@/shared/types/api.types";
import { fetchVideoInfo } from "./fetchVideoInfo";
import { getVideosData } from "@/app/api/db/blobVideos";

type GetVideosProps = {
  userId?: string;
  categoryId?: string;
};

export async function getVideos({
  userId,
  categoryId,
}: GetVideosProps = {}): Promise<GetVideosResponse> {
  const videosFromPrisma = await prisma.video.findMany();

  console.log(videosFromPrisma);

  const videos = await getVideosData();

  const all = [...videos];

  const categories = Array.from(new Set(all.map((data) => data[1].categoryId)));

  const filtered = all
    .filter(([, v]) => (userId ? v.userId === userId : true))
    .filter(([, v]) => (categoryId ? v.categoryId === categoryId : true));

  const result = (
    await Promise.allSettled(
      filtered.map(([videoId, { categoryId }]) =>
        fetchVideoInfo({ videoId, categoryId }),
      ),
    )
  ).flatMap((r) =>
    r.status === "fulfilled" && r.value != null ? [r.value] : [],
  );

  return { ok: true, data: result, categories };
}
