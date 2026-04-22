import Link from "next/link";
import { ROUTES, buildRoute } from "@/shared/constants/routes";
import cls from "./VideoList.module.css";
import { GetVideosResponse } from "@/shared/types/api.types";
import { VideoThumbnail } from "../VideoThumbnail";

type VideoListProps = {
  videos: GetVideosResponse["data"];
};

export function VideoList({ videos }: VideoListProps) {
  if (videos.length <= 0) {
    return <div className={cls.noVideosBlock}>No videos found 😕</div>;
  }

  return (
    <div className={cls.videoGrid}>
      {videos.map(({ videoId, title, authorName, authorUrl }) => (
        <div key={videoId} className={cls.videoBlock}>
          <Link href={buildRoute(ROUTES.VIDEO, { videoId })} className={cls.videoPreview}>
            <VideoThumbnail videoId={videoId} />
          </Link>

          <div className={cls.videoInfoContainer}>
            <Link
              href={buildRoute(ROUTES.PROFILE, { profileId: authorUrl })}
              className={cls.channelAvatarLink}
            >
              <div className={cls.hiddenText}>{authorName}</div>
            </Link>

            <div className={cls.videoInfo}>
              <Link href={buildRoute(ROUTES.VIDEO, { videoId })} className={cls.videoTitleLink}>
                <b>{title}</b>
              </Link>

              <Link
                href={buildRoute(ROUTES.PROFILE, { profileId: authorUrl })}
                className={cls.channelNameLink}
              >
                {authorName}
              </Link>
            </div>
          </div>

          <Link href={buildRoute(ROUTES.VIDEO, { videoId })} className={cls.videoOverlayLink} />
        </div>
      ))}
    </div>
  );
}
