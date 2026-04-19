import { useState } from "react";
import Image from "next/image";

import cls from "./VideoThumbnail.module.css";

type VideoThumbnailProps = {
  videoId: string;
};

export function VideoThumbnail({ videoId }: VideoThumbnailProps) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      fill
      priority
      unoptimized
      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
      alt="YouTube video"
      onLoad={() => setIsLoading(false)}
      className={`${cls.videoImg} ${isLoading ? cls.imgBlur : ""}`}
    />
  );
}
