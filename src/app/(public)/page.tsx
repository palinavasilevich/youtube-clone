import { HomeScreen } from "@/screen/HomeScreen";
import { getVideos } from "../api/videos/getVideos";
import { getUsers } from "../api/users/getUsers";

export default async function Home() {
  try {
    const userResponse = await getUsers();
    const currentUserId = userResponse.ok ? userResponse.user.id : undefined;

    const response = await getVideos({ currentUserId });

    if (!response.ok) {
      throw new Error(`Video request failed`);
    }

    const { data, categories } = response;

    return <HomeScreen data={data} categories={categories} />;
  } catch (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }
}
