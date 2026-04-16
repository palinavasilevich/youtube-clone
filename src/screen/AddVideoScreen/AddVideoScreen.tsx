"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAllowedHost, parseYouTube, YOUTUBE_DOMAINS } from "@/shared/libs";
import cls from "./AddVideoScreen.module.css";

type Inputs = {
  videoUrl: string;
};

const schema = z.object({
  videoUrl: z
    .string()
    .min(1, { message: "This field is required" })
    .superRefine((url, ctx) => {
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(url);
      } catch {
        ctx.addIssue({
          code: "custom",
          message: "This field must contain a link",
          input: url,
        });

        return;
      }

      if (!isAllowedHost(parsedUrl.host, YOUTUBE_DOMAINS)) {
        ctx.addIssue({
          code: "custom",
          message: "The link must be from YouTube",
          input: url,
        });
      }
    }),
});

export const AddVideoScreen = () => {
  const [videoId, setVideoId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const url = new URL(data.videoUrl);
      const videoId = parseYouTube(url);

      if (!videoId) {
        setErrorMessage("Invalid YouTube link");
        return;
      }

      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }),
      });

      let result = null;

      try {
        result = await response.json();
      } catch (error) {
        console.log(error);
      }

      if (!response.ok) {
        setVideoId("");
        setErrorMessage(result?.error || "Something went wrong");
        return;
      }

      setVideoId(videoId);

      await fetch("/api/videos");
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const hasVideoUrlError = !!errors.videoUrl?.message;

  return (
    <div className={cls.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
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
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={cls.iframe}
        />
      )}
    </div>
  );
};
