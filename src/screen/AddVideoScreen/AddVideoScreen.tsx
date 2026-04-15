"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parseYouTube } from "@/shared/libs";
import cls from "./AddVideoScreen.module.css";

type Inputs = {
  videoUrl: string;
};

const schema = z.object({
  videoUrl: z.string().min(1, { message: "This field is required" }),
});

export const AddVideoScreen = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { videoUrl } = data;

    if (!videoUrl) return;

    let finalUrl = null;

    try {
      finalUrl = new URL(videoUrl);
    } catch (error) {
      console.error(error);
    }

    if (!finalUrl) return;

    const id = parseYouTube(finalUrl);
    setVideoId(id);

    if (id) {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
      );

      const data = await res.json();
      setTitle(data.title);
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
            defaultValue="https://www.youtube.com/watch?v=oHAmjGo7h58"
            {...register("videoUrl")}
          />
          {hasVideoUrlError && (
            <p className={cls.errorMessage}>{errors.videoUrl?.message}</p>
          )}
        </label>

        <button type="submit" className={cls.btn}>
          Add Video
        </button>
      </form>

      {videoId && (
        <iframe
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};
