"use client";

import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { useAddVideoForm } from "@/screen/AddVideoScreen/lib/useAddVideoForm";
import { cn } from "@/shared/lib/css";

import cls from "./AddVideoScreen.module.css";
import { Loader } from "@/shared/components";

export const AddVideoScreen = ({ userId }: { userId: string }) => {
  const { videoId, isLoading, errors, errorMessage, register, onSubmit } =
    useAddVideoForm(userId);

  const hasVideoUrlError = !!errors.videoUrl?.message;
  const hasVideoCategoryError = !!errors.videoCategory?.message;
  const hasIsPrivateError = !!errors.isPrivate?.message;

  if (isLoading) {
    return (
      <div className={cls.container}>
        <Loader size={48} />
      </div>
    );
  }

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
            <p className={cls.inputErrorMessage}>
              {errors.videoCategory?.message}
            </p>
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
            <p className={cls.inputErrorMessage}>{errors.videoUrl?.message}</p>
          )}
        </label>

        <label htmlFor="isPrivate" className={cls.checkboxLabel}>
          <input
            id="isPrivate"
            type="checkbox"
            className={cn(cls.checkbox, hasIsPrivateError && cls.errorInput)}
            {...register("isPrivate")}
          />
          <span>Private video</span>
          {hasIsPrivateError && (
            <p className={cls.inputErrorMessage}>{errors.isPrivate?.message}</p>
          )}
        </label>

        {errorMessage && !hasVideoUrlError && !hasVideoCategoryError && (
          <p className={cls.errorMessage}>{errorMessage}</p>
        )}

        <button type="submit" className={cls.submitButton} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Video"}
        </button>
      </form>

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
