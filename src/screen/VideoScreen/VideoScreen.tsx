"use client";

import Link from "next/link";
import Image from "next/image";
import { ROUTES, buildRoute } from "@/shared/constants/routes";
import { VideoInfo } from "@/shared/types/api.types";
import cls from "./VideoScreen.module.css";
import { useState } from "react";
import { cn } from "@/shared/lib/css";
import { dateFormat, viewsFormat } from "@/shared/lib/dataFormat";

type VideoScreenProps = {
  data: Omit<VideoInfo, "categoryId">;
};

function linkifyText(text: string) {
  return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className={cls.link}>
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export const VideoScreen = ({ data }: VideoScreenProps) => {
  const {
    videoId,
    title,
    description,
    views,
    authorName,
    authorUrl,
    authorUsername,
    channelThumbnail,
    publishedAt,
  } = data;

  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className={cls.container}>
      <iframe
        width="550"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className={cls.iframe}
      />

      <h1 className={cls.videoTitle}>{title}</h1>

      <div className={cls.videoInfoContainer}>
        <Link
          href={buildRoute(ROUTES.PROFILE, { userId: authorUrl })}
          className={cls.channelAvatarLink}
        >
          {channelThumbnail ? (
            <Image
              src={channelThumbnail}
              alt={authorName}
              fill
              unoptimized
              className={cls.channelAvatar}
            />
          ) : (
            <div className={cls.hiddenText}>{authorName}</div>
          )}
        </Link>
        <a
          href={
            authorUsername
              ? `https://www.youtube.com/${authorUsername}`
              : `https://www.youtube.com/channel/${authorUrl}`
          }
          className={cls.channelNameLink}
        >
          {authorName ?? authorUsername}
        </a>
      </div>

      {description && (
        <div
          className={cn(
            cls.descriptionContainer,
            !showFullDescription && cls.shortDescription,
          )}
        >
          <div className={cls.videoInfo}>
            <span className={cls.views}>{viewsFormat(views)} views </span>
            {publishedAt && (
              <span className={cls.publishedAt}>
                {dateFormat({ date: publishedAt, format: "full" })}
              </span>
            )}
          </div>
          <p className={cls.description}>
            {linkifyText(showFullDescription ? description : description.slice(0, 300))}
            {!showFullDescription && (
              <span
                className={cls.moreButton}
                onClick={() => setShowFullDescription(true)}
              >
                ...more
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};
