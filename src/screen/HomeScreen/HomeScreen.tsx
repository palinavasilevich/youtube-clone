"use client";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { GetVideosResponse } from "@/shared/types/api.types";
import { VideoCategoriesType } from "@/shared/constants/videoCategories";
import { VideoThumbnail } from "@/shared/components";
import cls from "./HomeScreen.module.css";

type HomeScreenProps = {
  data: GetVideosResponse["data"];
  categories: VideoCategoriesType;
};

export const HomeScreen = ({ data: videos, categories }: HomeScreenProps) => {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const filteredVideos = activeCategory
    ? videos.filter((v) => v.categoryId === activeCategory)
    : videos;

  return (
    <div className={cls.container}>
      <div className={cls.categoriesContainer}>
        {categories.length > 0 &&
          categories.map((category) => (
            <Link
              key={category.id}
              href={`/?category=${category.id}`}
              className={cls.categoryLink}
            >
              {category.title}
            </Link>
          ))}
      </div>
      <div className={cls.videoGrid}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map(({ videoId, title, authorName, authorUrl }) => (
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
