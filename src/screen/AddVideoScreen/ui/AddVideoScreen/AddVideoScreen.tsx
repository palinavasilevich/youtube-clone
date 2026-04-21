"use client";

import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { useAddVideoForm } from "@/screen/AddVideoScreen/lib/useAddVideoForm";
import { cn } from "@/shared/lib/css";
import cls from "./AddVideoScreen.module.css";

export const AddVideoScreen = () => {
  const { videoId, isLoading, errors, errorMessage, register, onSubmit } =
    useAddVideoForm();

  const hasVideoUrlError = !!errors.videoUrl?.message;
  const hasVideoCategoryError = !!errors.videoCategory?.message;

  return (
    <div className={cls.container}>
      <form onSubmit={onSubmit} className={cls.form}>
        <label htmlFor="videoCategory" className={cls.label}>
          <select
            id="videoCategory"
            className={cn(cls.select, hasVideoCategoryError && cls.errorInput)}
            {...register("videoCategory")}
          >
            {VIDEO_CATEGORIES.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className={cls.category}
              >
                {category.title}
              </option>
            ))}
          </select>
          {hasVideoCategoryError && (
            <p className={cls.errorMessage}>{errors.videoCategory?.message}</p>
          )}
        </label>

        <label htmlFor="videoUrl" className={cls.label}>
          <input
            id="videoUrl"
            type="text"
            placeholder="Paste the link to the YouTube video"
            className={cn(cls.input, hasVideoUrlError && cls.errorInput)}
            {...register("videoUrl")}
          />
          {hasVideoUrlError && (
            <p className={cls.errorMessage}>{errors.videoUrl?.message}</p>
          )}
        </label>

        <button type="submit" className={cls.submitButton} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Video"}
        </button>
      </form>
      {errorMessage && <p className={cls.errorMessage}>{errorMessage}</p>}
      {videoId && (
        <iframe
          width="700"
          height="350"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={cls.iframe}
        />
      )}
    </div>
  );
};
