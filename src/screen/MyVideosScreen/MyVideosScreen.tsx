"use client";

import { VideoInfo } from "@/shared/types/api.types";
import { VideoList } from "@/widgets/VideoList";
import cls from "./MyVideosScreen.module.css";

type MyVideosScreenProps = {
  videos: VideoInfo[];
  currentUserId: string;
};

export function MyVideosScreen({ videos, currentUserId }: MyVideosScreenProps) {
  return (
    <div className={cls.container}>
      <VideoList videos={videos} currentUserId={currentUserId} />
    </div>
  );
}
