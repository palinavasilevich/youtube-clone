"use client";

import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { useAddVideoForm } from "@/screen/AddVideoScreen/lib/useAddVideoForm";
import { cn } from "@/shared/lib/css";
import { Loader } from "@/shared/components";

import cls from "./AddVideoScreen.module.css";

export const AddVideoScreen = ({ userId }: { userId: string }) => {
  const { videoId, isLoading, errors, errorMessage, register, onSubmit } =
    useAddVideoForm(userId);

  const hasVideoUrlError = !!errors.videoUrl?.message;
  const hasVideoCategoryError = !!errors.videoCategory?.message;
  const hasIsPrivateError = !!errors.isPrivate?.message;

  if (isLoading) {
    return (
      <div className={cls.loaderContainer}>
        <Loader size={48} />
      </div>
    );
  }

  return (
    <div className={cls.container}>
      <div style={{ width: "100%", maxWidth: 600, display: "flex", flexDirection: "column", gap: 16 }}>
        <form onSubmit={onSubmit} className={cls.card}>
          <h2 className={cls.cardTitle}>Add video</h2>
          <div className={cls.divider} />

          <div className={cls.fields}>
            <div className={cls.fieldGroup}>
              <label htmlFor="videoUrl" className={cls.label}>YouTube URL</label>
              <input
                id="videoUrl"
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                className={cn(cls.input, hasVideoUrlError && cls.inputError)}
                {...register("videoUrl")}
              />
              {hasVideoUrlError && (
                <p className={cls.fieldError}>{errors.videoUrl?.message}</p>
              )}
            </div>

            <div className={cls.fieldGroup}>
              <label htmlFor="videoCategory" className={cls.label}>Category</label>
              <select
                id="videoCategory"
                defaultValue=""
                className={cn(cls.select, hasVideoCategoryError && cls.inputError)}
                {...register("videoCategory")}
              >
                <option disabled value="">Select a category</option>
                {VIDEO_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
              {hasVideoCategoryError && (
                <p className={cls.fieldError}>{errors.videoCategory?.message}</p>
              )}
            </div>

            <div className={cls.fieldGroup}>
              <span className={cls.label}>Visibility</span>
              <label className={cls.toggle}>
                <div className={cls.toggleText}>
                  <span className={cls.toggleTitle}>Private video</span>
                  <span className={cls.toggleSub}>Only you can see this video</span>
                </div>
                <div className={cls.toggleSwitch}>
                  <input
                    id="isPrivate"
                    type="checkbox"
                    {...register("isPrivate")}
                  />
                  <span className={cls.toggleTrack} />
                </div>
              </label>
              {hasIsPrivateError && (
                <p className={cls.fieldError}>{errors.isPrivate?.message}</p>
              )}
            </div>
          </div>

          {errorMessage && !hasVideoUrlError && !hasVideoCategoryError && (
            <p className={cls.globalError}>{errorMessage}</p>
          )}

          <div className={cls.actions}>
            <button type="submit" className={cls.submitButton} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add video"}
            </button>
          </div>
        </form>

        {videoId && (
          <iframe
            className={cls.preview}
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};
