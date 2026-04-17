"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cls from "./HomeScreen.module.css";
import { GetVideosResponse } from "@/shared/types/api.types";

type HomeScreenProps = {
  data: GetVideosResponse["data"];
};

export const HomeScreen = ({ data: videos }: HomeScreenProps) => {
  const [isImageLoading, setImageLoading] = useState(true);
  return (
    <div className={cls.container}>
      {videos && videos?.length > 0 ? (
        videos.map(({ videoId, title, authorName, authorUrl }) => (
          <div key={videoId} className={cls.videoBlock}>
            <Link href={`/video/${videoId}`} className={cls.videoPreview}>
              <Image
                fill
                priority
                unoptimized
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt="YouTube video"
                onLoad={() => setImageLoading(false)}
                className={`${cls.videoImg} ${isImageLoading ? cls.imgBlur : ""}`}
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
