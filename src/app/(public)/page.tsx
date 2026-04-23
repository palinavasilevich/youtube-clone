import { HomeScreen } from "@/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { getVideos } from "../api/videos/getVideos";

export default async function Home() {
  try {
    const response = await getVideos();

    if (!response.ok) {
      throw new Error(`Video request failed`);
    }

    const { data, categories } = response;

    const filteredCategories = VIDEO_CATEGORIES.filter(({ id }) =>
      categories.includes(id),
    );

    return <HomeScreen data={data} categories={filteredCategories} />;
  } catch (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }
}
