import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { isAllowedHost, parseYouTube, YOUTUBE_DOMAINS } from "@/shared/lib";
import {
  CATEGORIES,
  VideoCategoryId,
} from "@/shared/constants/videoCategories";
import { addVideo } from "@/app/api/videos/addVideo";

type Inputs = {
  videoUrl: string;
  videoCategory: VideoCategoryId;
  isPrivate: boolean;
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

  videoCategory: z.enum(CATEGORIES, { message: "Invalid category" }),

  isPrivate: z.boolean(),
});

export function useAddVideoForm(userId: string) {
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
    defaultValues: { isPrivate: false },
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

      const response = await addVideo({
        userId,
        videoId,
        categoryId: data.videoCategory,
        isPrivate: data.isPrivate,
      });

      if (!response.ok) {
        setVideoId("");
        setErrorMessage(response?.message || "Something went wrong");
        return;
      }

      setVideoId(videoId);
      reset();
    } catch (error) {
      console.error(error);
      setErrorMessage("Request to add video failed. Please try again.");
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
