"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cls from "./HomeScreen.module.css";
import { GetVideosResponse } from "@/shared/types/api.types";

export const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<GetVideosResponse["data"] | null>(null);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/videos");

      if (!response.ok) {
        throw new Error("");
      }

      const { data } = (await response.json()) as GetVideosResponse;
      setVideos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cls.container}>
      {videos && videos?.length > 0 ? (
        videos.map(({ videoId, title, authorName, authorUrl }) => (
          <div key={videoId} className={cls.videoBlock}>
            <Link href={`/video/${videoId}`} className={cls.videoPreview}>
              <Image
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="YouTube video"
                className={cls.videoImg}
              />
            </Link>

            <div className={cls.videoInfoContainer}>
              <Link
                href={`/profile/${authorUrl}`}
                className={cls.channelAvatarLink}
              >
                <div className={cls.hiddenText}>{authorName}</div>
              </Link>

              <div className={cls.videoInfo}>
                <Link href={`/video/${videoId}`} className={cls.videoTitleLink}>
                  <b>{title}</b>
                </Link>

                <Link
                  href={`/profile/${authorUrl}`}
                  className={cls.channelNameLink}
                >
                  {authorName}
                </Link>
              </div>
            </div>

            <Link href={`/video/${videoId}`} className={cls.link} />
          </div>
        ))
      ) : (
        <p>There are no videos</p>
      )}
    </div>
  );
};
