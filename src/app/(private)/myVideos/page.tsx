import { Metadata } from "next";

import { MyVideosScreen } from "@/screen/MyVideosScreen";
import { GetVideosResponse } from "@/shared/types/api.types";

type MyVideosPageProps = {
  params: Promise<{ userId: string }>;
};

export const metadata: Metadata = {
  title: "My videos",
};

export default async function MyVideosPage({}: MyVideosPageProps) {
  // const { categoryId } = await params;
  const userId = "USER_ID";

  try {
    const response = await fetch(
      `${process.env.SERVER_API_URL}/api/videos?userId=${userId}`,
    );

    if (!response.ok) {
      throw new Error("No video data available");
    }

    const { data } = (await response.json()) as GetVideosResponse;

    if (!data) {
      throw new Error("No video data available");
    }

    return <MyVideosScreen videos={data} />;
  } catch (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }
}
