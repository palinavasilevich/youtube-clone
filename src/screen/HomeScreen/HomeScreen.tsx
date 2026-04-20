"use client";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { GetVideosResponse } from "@/shared/types/api.types";
import {
  DEFAULT_CATEGORY,
  VideoCategoriesType,
} from "@/shared/constants/videoCategories";
import { VideoThumbnail } from "@/shared/components";
import cls from "./HomeScreen.module.css";
import { cn } from "@/shared/lib/css";

type HomeScreenProps = {
  data: GetVideosResponse["data"];
  categories: VideoCategoriesType;
  activeCategoryId?: string;
};

export const HomeScreen = ({
  data: videos,
  categories,
  activeCategoryId,
}: HomeScreenProps) => {
  return (
    <div className={cls.container}>
      <div className={cls.categoriesContainer}>
        {categories && categories.length > 0 && (
          <>
            <Link href={`/`} className={cn(cls.categoryLink)}>
              {DEFAULT_CATEGORY.title}
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.id}`}
                className={cn(
                  cls.categoryLink,
                  activeCategoryId === category.id && cls.activeCategoryLink,
                )}
              >
                {category.title}
              </Link>
            ))}
          </>
        )}
      </div>
      <div className={cls.videoGrid}>
        {videos.length > 0 ? (
          videos.map(({ videoId, title, authorName, authorUrl }) => (
            <div key={videoId} className={cls.videoBlock}>
              <Link href={`/video/${videoId}`} className={cls.videoPreview}>
                <VideoThumbnail videoId={videoId} />
              </Link>

              <div className={cls.videoInfoContainer}>
                <Link
                  href={`/profile/${authorUrl}`}
                  className={cls.channelAvatarLink}
                >
                  <div className={cls.hiddenText}>{authorName}</div>
                </Link>

                <div className={cls.videoInfo}>
                  <Link
                    href={`/video/${videoId}`}
                    className={cls.videoTitleLink}
                  >
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
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
};
