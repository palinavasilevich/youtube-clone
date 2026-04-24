import { GetVideoByIdResponse } from "@/shared/types/api.types";
import { fetchVideoInfo } from "./fetchVideoInfo";
import { getVideosData } from "../db/blobVideos";

type GetVideoByIdProps = {
  videoId: string;
};

export async function getVideoById({
  videoId,
}: GetVideoByIdProps): Promise<GetVideoByIdResponse> {
  const videos = await getVideosData();

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
