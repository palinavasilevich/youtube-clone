import { HomeScreen } from "@/screen/HomeScreen";
import { getVideos } from "../api/videos/getVideos";

export default async function Home() {
  try {
    const response = await getVideos();

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
