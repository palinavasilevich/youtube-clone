"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cls from "./HomeScreen.module.css";

export const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<string[] | null>(null);

  const getVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/videos");

      if (!response.ok) {
        throw new Error("");
      }

      const { data } = await response.json();
      setVideos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cls.container}>
      {videos && videos?.length > 0 ? (
        videos.map((videoId) => (
          <div key={videoId} className={cls.videoBlock}>
            <Link href={`/video/${videoId}`} className={cls.videoPreview}>
              <Image
                fill
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="YouTube video"
                className={cls.videoImg}
              />
            </Link>

            <div className={cls.videoInfoContainer}>
              <Link href="/CHANNEL-NAME" className={cls.channelImg}>
                <div className={cls.hiddenText}>CHANNEL NAME</div>
              </Link>

              <div className={cls.videoInfo}>
                <Link href={`/video/${videoId}`} className={cls.videoTitleLink}>
                  <b>VIDEO TITLE</b>
                </Link>

                <Link href="/CHANNEL-NAME" className={cls.channelNameLink}>
                  CHANNEL NAME
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
