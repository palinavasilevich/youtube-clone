import { Metadata } from "next";
import { MyVideosScreen } from "@/screen/MyVideosScreen";
import { getVideos } from "@/app/api/videos/getVideos";
import { getUsers } from "@/app/api/users/getUsers";

export const metadata: Metadata = {
  title: "My videos",
};

export default async function MyVideosPage() {
  try {
    const userResponse = await getUsers();

    if (!userResponse.ok) {
      throw new Error("Failed to get current user");
    }

    const response = await getVideos({ userId: userResponse.user.id });

    if (!response.data) {
      throw new Error(`Video request failed`);
    }

    return <MyVideosScreen videos={response.data} />;
  } catch (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }
}
