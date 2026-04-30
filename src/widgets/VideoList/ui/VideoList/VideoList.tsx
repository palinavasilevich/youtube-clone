import Image from "next/image";
import Link from "next/link";
import { VideoInfo } from "@/shared/types/api.types";
import { ROUTES, buildRoute } from "@/shared/constants/routes";
import cls from "./VideoList.module.css";
import { VideoThumbnail } from "../VideoThumbnail";
import { VideoDeleteButton } from "../VideoDeleteButton";
import { VideoPrivacyToggle } from "../VideoPrivacyToggle";
import { dateFormat, viewsFormat } from "@/shared/lib/dataFormat";

type VideoListProps = {
  videos: VideoInfo[];
  currentUserId?: string;
};

export function VideoList({ videos, currentUserId }: VideoListProps) {
  if (!videos || videos.length <= 0) {
    return <div className={cls.noVideosBlock}>No videos found 😕</div>;
  }

  return (
    <div className={cls.videoGrid}>
      {videos.map(
        ({
          videoId,
          ownerId,
          isPrivate,
          title,
          authorName,
          authorUrl,
          authorUsername,
          channelThumbnail,
          views,
          publishedAt,
        }) => (
          <div key={videoId} className={cls.videoBlock}>
            <Link
              href={buildRoute(ROUTES.VIDEO, { videoId })}
              className={cls.videoPreview}
            >
              <VideoThumbnail videoId={videoId} />
            </Link>

            <div className={cls.videoInfoContainer}>
              <Link
                href={buildRoute(ROUTES.PROFILE, { userId: authorUrl })}
                className={cls.channelAvatarLink}
              >
                {channelThumbnail ? (
                  <Image
                    src={channelThumbnail}
                    alt={authorName}
                    fill
                    unoptimized
                    className={cls.channelAvatar}
                  />
                ) : (
                  <div className={cls.hiddenText}>{authorName}</div>
                )}
              </Link>

              <div className={cls.videoInfo}>
                <Link
                  href={buildRoute(ROUTES.VIDEO, { videoId })}
                  className={cls.videoTitleLink}
                >
                  <h3>{title}</h3>
                </Link>

                <div className={cls.channelInfoContainer}>
                  <a
                    href={
                      authorUsername
                        ? `https://www.youtube.com/${authorUsername}`
                        : `https://www.youtube.com/channel/${authorUrl}`
                    }
                    className={cls.channelNameLink}
                  >
                    {authorName ?? authorUsername}
                  </a>
                  <div>
                    {views !== null && <span>{viewsFormat(views)} views</span>}
                    <span> • </span>
                    {publishedAt && (
                      <span className={cls.publishedAt}>
                        {dateFormat({ date: publishedAt })}
                      </span>
                    )}
                  </div>
                </div>

                {currentUserId === ownerId && (
                  <div className={cls.videoActions}>
                    <VideoPrivacyToggle
                      videoId={videoId}
                      userId={currentUserId}
                      isPrivate={isPrivate}
                    />
                    <VideoDeleteButton
                      videoId={videoId}
                      userId={currentUserId}
                    />
                  </div>
                )}
              </div>
            </div>

            <Link
              href={buildRoute(ROUTES.VIDEO, { videoId })}
              className={cls.videoOverlayLink}
            />
          </div>
        ),
      )}
    </div>
  );
}
