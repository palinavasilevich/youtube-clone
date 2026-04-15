import cls from "./VideoScreen.module.css";

type VideoScreenProps = {
  videoId: string;
};

export const VideoScreen = ({ videoId }: VideoScreenProps) => {
  return (
    <div className={cls.container}>
      {videoId && (
        <iframe
          width="550"
          height="300"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </div>
  );
};
