import { HomeScreen } from "@/screen/HomeScreen";
import { GetVideosResponse } from "@/shared/types/api.types";

export default async function Home() {
  try {
    const response = await fetch(`${process.env.SERVER_ARI_URL}/api/videos`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const { data, categories } = (await response.json()) as GetVideosResponse;

    return <HomeScreen data={data} categories={categories} />;
  } catch (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }
}
