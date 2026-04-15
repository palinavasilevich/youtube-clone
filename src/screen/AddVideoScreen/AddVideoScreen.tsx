"use client";

import { useState } from "react";
import { parseYouTube } from "@/shared/libs";
import cls from "./AddVideoScreen.module.css";

// https://www.youtube.com/watch?v=oHAmjGo7h58

export const AddVideoScreen = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  const addVideo = async (formData: FormData) => {
    const url = formData.get("url");

    if (typeof url !== "string" || !url) return;

    let finalUrl = null;

    try {
      finalUrl = new URL(url);
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
      console.log(data);
      setTitle(data.title);
    }
  };

  return (
    <div className={cls.addVideoScreen}>
      <form action={addVideo}>
        <input
          name="url"
          type="text"
          placeholder="Paste the link to the YouTube video"
        />
        <button type="submit">Add Video</button>
      </form>

      {videoId && (
        <iframe
          width="853"
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
