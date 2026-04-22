import { HomeScreen } from "@/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { GetVideosResponse } from "@/shared/types/api.types";

export default async function Home() {
  try {
    const response = await fetch(`${process.env.SERVER_API_URL}/api/videos`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const { data, categories } = (await response.json()) as GetVideosResponse;

    const filteredCategories = VIDEO_CATEGORIES.filter(({ id }) =>
      categories.includes(id),
    );

    return <HomeScreen data={data} categories={filteredCategories} />;
  } catch (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }
}
