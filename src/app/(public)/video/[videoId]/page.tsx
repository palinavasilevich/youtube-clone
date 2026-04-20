import { VideoScreen } from "@/screen/VideoScreen";
import { GetVideoByIdResponse } from "@/shared/types/api.types";
import { Metadata } from "next";

type VideoPageProps = {
  params: Promise<{ videoId: string }>;
};

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const { videoId } = await params;

  try {
    const response = await fetch(
      `${process.env.SERVER_API_URL}/api/video/${videoId}`,
    );
    const { data: video } = (await response.json()) as GetVideoByIdResponse;

    if (!video) {
      throw new Error("No video data available");
    }

    return {
      title: `Video: ${video.title}`,
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
    const response = await fetch(
      `${process.env.SERVER_API_URL}/api/video/${videoId}`,
    );

    if (!response.ok) {
      throw new Error("No video data available");
    }

    const { data } = (await response.json()) as GetVideoByIdResponse;

    if (!data) {
      throw new Error("No video data available");
    }

    return <VideoScreen data={data} />;
  } catch (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }
}
