import { videos } from "@/app/api/db/videos";
import { GetVideoByIdResponse } from "@/shared/types/api.types";
import { fetchVideoInfo } from "./fetchVideoInfo";

type GetVideoByIdProps = {
  videoId: string;
};

export async function getVideoById({
  videoId,
}: GetVideoByIdProps): Promise<GetVideoByIdResponse> {
  if (!videos.has(videoId)) {
    return { ok: false, data: null };
  }

  const categoryId = videos.get(videoId)!.categoryId;
  const result = await fetchVideoInfo({ videoId, categoryId });

  if (!result) {
    return { ok: false, data: null };
  }

  return { ok: true, data: result };
}
