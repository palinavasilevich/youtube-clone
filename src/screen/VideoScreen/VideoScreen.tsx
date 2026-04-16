import Link from "next/link";
import cls from "./VideoScreen.module.css";

type VideoScreenProps = {
  videoId: string;
};

export const VideoScreen = ({ videoId }: VideoScreenProps) => {
  return (
    <div className={cls.container}>
      <iframe
        width="550"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={cls.iframe}
      />

      <b>VIDEO TITLE</b>

      <div className={cls.videoInfoContainer}>
        <Link href="/CHANNEL-NAME" className={cls.channelImg}>
          <div className={cls.hiddenText}>CHANNEL NAME</div>
        </Link>

        <Link href="/CHANNEL-NAME" className={cls.channelNameLink}>
          CHANNEL NAME
        </Link>
      </div>
    </div>
  );
};
