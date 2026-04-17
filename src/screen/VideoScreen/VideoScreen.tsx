import Link from "next/link";
import { Video } from "@/shared/types/api.types";
import cls from "./VideoScreen.module.css";

type VideoScreenProps = {
  data: Video;
};

export const VideoScreen = ({ data }: VideoScreenProps) => {
  const { videoId, title, authorName, authorUrl } = data;

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

      <b>{title}</b>

      <div className={cls.videoInfoContainer}>
        <Link href={`/profile/${authorUrl}`} className={cls.channelAvatarLink}>
          <div className={cls.hiddenText}>{authorName}</div>
        </Link>

        <Link href={`/profile/${authorUrl}`} className={cls.channelNameLink}>
          {authorName}
        </Link>
      </div>
    </div>
  );
};
