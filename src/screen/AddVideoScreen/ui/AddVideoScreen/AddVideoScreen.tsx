"use client";

import { useAddVideoForm } from "../../lib/useAddVideoForm";
import cls from "./AddVideoScreen.module.css";

export const AddVideoScreen = () => {
  const { videoId, isLoading, errors, errorMessage, register, onSubmit } =
    useAddVideoForm();

  const hasVideoUrlError = !!errors.videoUrl?.message;

  return (
    <div className={cls.container}>
      <form onSubmit={onSubmit} className={cls.form}>
        <label htmlFor="videoUrl" className={cls.label}>
          <input
            id="videoUrl"
            type="text"
            placeholder="Paste the link to the YouTube video"
            className={`${cls.input} ${hasVideoUrlError ? cls.errorInput : ""}`}
            {...register("videoUrl")}
          />
          {hasVideoUrlError && (
            <p className={cls.errorMessage}>{errors.videoUrl?.message}</p>
          )}

          {errorMessage && <p className={cls.errorMessage}>{errorMessage}</p>}
        </label>

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
