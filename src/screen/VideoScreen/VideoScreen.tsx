import Link from "next/link";
import Image from "next/image";
import { ROUTES, buildRoute } from "@/shared/constants/routes";
import { VideoInfo } from "@/shared/types/api.types";
import cls from "./VideoScreen.module.css";

type VideoScreenProps = {
  data: Omit<VideoInfo, "categoryId">;
};

export const VideoScreen = ({ data }: VideoScreenProps) => {
  const { videoId, title, authorName, authorUrl, channelThumbnail } = data;

  return (
    <div className={cls.container}>
      <iframe
        width="550"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={cls.iframe}
      />

      <h1 className={cls.title}>{title}</h1>

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

        <Link
          href={buildRoute(ROUTES.PROFILE, { userId: authorUrl })}
          className={cls.channelNameLink}
        >
          {authorName}
        </Link>
      </div>
    </div>
  );
};
