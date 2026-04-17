"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GetVideoByIdResponse } from "@/shared/types/api.types";
import cls from "./VideoScreen.module.css";

type VideoScreenProps = {
  videoId: string;
};

export const VideoScreen = ({ videoId }: VideoScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [video, setVideo] = useState<GetVideoByIdResponse["data"] | null>(null);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/video/${videoId}`);

      if (!response.ok) {
        throw new Error("No video data available");
      }

      const { data } = (await response.json()) as GetVideoByIdResponse;

      if (data) {
        setVideo(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [videoId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!video) {
    return null;
  }

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

      <b>{video?.title}</b>

      <div className={cls.videoInfoContainer}>
        <Link
          href={`/profile/${video.authorUrl}`}
          className={cls.channelAvatarLink}
        >
          <div className={cls.hiddenText}>{video.authorName}</div>
        </Link>

        <Link
          href={`/profile/${video?.authorUrl}`}
          className={cls.channelNameLink}
        >
          {video.authorName}
        </Link>
      </div>
    </div>
  );
};
