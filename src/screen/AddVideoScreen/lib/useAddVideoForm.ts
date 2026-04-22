import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAllowedHost, parseYouTube, YOUTUBE_DOMAINS } from "@/shared/lib";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";

const validCategoryIds = VIDEO_CATEGORIES.map((c) => c.id);

type Inputs = {
  videoUrl: string;
  videoCategory: string;
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

  videoCategory: z.string().refine((val) => validCategoryIds.includes(val), {
    message: "Invalid category",
  }),
});

export function useAddVideoForm() {
  const [videoId, setVideoId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
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
        body: JSON.stringify({
          userId: "USER_ID",
          videoId,
          categoryId: data.videoCategory,
        }),
      });

      let result = null;

      try {
        result = await response.json();
      } catch (error) {
        console.error(error);
      }

      if (!response.ok) {
        setVideoId("");
        setErrorMessage(result?.message || "Something went wrong");
        return;
      }

      setVideoId(videoId);
      reset();
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    videoId,
    isLoading,
    errorMessage,
    register,
    errors,
    onSubmit: handleSubmit(onSubmitHandler),
  };
}
