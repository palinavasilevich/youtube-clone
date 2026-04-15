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
    <div>Loading...</div>;
  }

  return (
    <div className={cls.container}>
      {videos && videos?.length > 0 ? (
        videos.map((videoId) => (
          <Link href={`/video/${videoId}`} key={videoId}>
            <Image
              width="150"
              height="150"
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="YouTube video"
            />
          </Link>
        ))
      ) : (
        <p>There are no videos</p>
      )}
    </div>
  );
};
