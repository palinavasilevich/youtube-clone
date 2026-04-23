import { cache } from "react";
import { getVideoById } from "@/app/api/videos/getVideoById";
import { VideoScreen } from "@/screen/VideoScreen";
import { Metadata } from "next";

const cachedGetVideoById = cache(getVideoById);

type VideoPageProps = {
  params: Promise<{ videoId: string }>;
};

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const { videoId } = await params;

  try {
    const response = await cachedGetVideoById({ videoId });

    if (!response.ok) {
      throw new Error("No video data available");
    }

    return {
      title: `Video: ${response.data.title}`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Something went wrong..",
    };
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { videoId } = await params;

  try {
    const response = await cachedGetVideoById({ videoId });

    if (!response.ok) {
      throw new Error("No video data available");
    }

    return <VideoScreen data={response.data} />;
  } catch (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }
}
