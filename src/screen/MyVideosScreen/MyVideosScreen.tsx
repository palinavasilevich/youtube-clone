"use client";

import { VideoInfo } from "@/shared/types/api.types";
import { VideoList } from "@/widgets/VideoList";
import cls from "./MyVideosScreen.module.css";

type MyVideosScreenProps = {
  videos: VideoInfo[];
};

export function MyVideosScreen({ videos }: MyVideosScreenProps) {
  return (
    <div className={cls.container}>
      <VideoList videos={videos} />
    </div>
  );
}
