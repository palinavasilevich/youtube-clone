"use client";

import { useEffect, useState } from "react";
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
          <iframe
            key={videoId}
            width="550"
            height="550"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ))
      ) : (
        <p>There are no videos</p>
      )}
    </div>
  );
};
