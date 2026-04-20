import { HomeScreen } from "@/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { GetVideosResponse } from "@/shared/types/api.types";
import { Metadata } from "next";

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryId } = await params;

  const foundCategory = VIDEO_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  if (!foundCategory) {
    return { title: "Video in unknown category" };
  }

  return {
    title: `Video in category: ${foundCategory?.title}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  try {
    const response = await fetch(
      `${process.env.SERVER_API_URL}/api/videos?categoryId=${categoryId}`,
    );

    if (!response.ok) {
      throw new Error("No category data available");
    }

    const { data, categories } = (await response.json()) as GetVideosResponse;

    if (!data) {
      throw new Error("No category data available");
    }

    const filteredCategories = VIDEO_CATEGORIES.filter(({ id }) =>
      categories.includes(id),
    );

    return (
      <HomeScreen
        data={data}
        categories={filteredCategories}
        activeCategoryId={categoryId}
      />
    );
  } catch (error) {
    console.error(error);
    return <div>Something went wrong...</div>;
  }
}
