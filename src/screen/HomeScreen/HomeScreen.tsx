"use client";

import Link from "next/link";
import { VideoInfo, GetVideosResponse } from "@/shared/types/api.types";
import { DEFAULT_CATEGORY } from "@/shared/constants/videoCategories";
import { VideoList } from "@/widgets/VideoList";

import cls from "./HomeScreen.module.css";
import { cn } from "@/shared/lib/css";
import { ROUTES, buildRoute } from "@/shared/constants/routes";

type Category = { id: string; title: string };

type HomeScreenProps = {
  data: VideoInfo[];
  categories: Category[];
  activeCategoryId?: string;
};

export const HomeScreen = ({
  data,
  categories,
  activeCategoryId,
}: HomeScreenProps) => {
  return (
    <div className={cls.container}>
      <div className={cls.categoriesContainer}>
        {categories && categories.length > 0 && (
          <>
            <Link
              href={ROUTES.HOME}
              className={cn(
                cls.categoryLink,
                !activeCategoryId && cls.activeCategoryLink,
              )}
            >
              {DEFAULT_CATEGORY.title}
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={buildRoute(ROUTES.CATEGORY, { categoryId: category.id })}
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
      <VideoList videos={data} />
    </div>
  );
};
