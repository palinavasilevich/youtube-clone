"use client";

import { GetVideosResponse } from "@/shared/types/api.types";
import { VideoList } from "@/widgets/VideoList";
import cls from "./MyVideosScreen.module.css";

type MyVideosScreenProps = {
  videos: GetVideosResponse["data"];
};

export function MyVideosScreen({ videos }: MyVideosScreenProps) {
  return (
    <div className={cls.container}>
      <VideoList videos={videos} />
    </div>
  );
}
