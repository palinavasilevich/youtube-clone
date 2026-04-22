import { HomeScreen } from "@/screen/HomeScreen";
import { AUTH_COOKIE_NAME } from "@/shared/constants/cookiesNames";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { GetVideosResponse } from "@/shared/types/api.types";
import { cookies } from "next/headers";

export default async function Home() {
  try {
    const response = await fetch(`${process.env.SERVER_API_URL}/api/videos`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const cookieStore = await cookies();
    const authToken = cookieStore.get(AUTH_COOKIE_NAME);

    const userResponse = await fetch(
      `${process.env.SERVER_API_URL}/api/users`,
      {
        method: "GET",
        headers: {
          cookie: `${AUTH_COOKIE_NAME}=${authToken?.value}`,
        },
      },
    );

    const userData = await userResponse.json();

    console.log("userData === ", userData);

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
