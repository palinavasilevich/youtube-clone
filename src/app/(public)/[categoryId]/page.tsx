import { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeScreen } from "@/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/shared/constants/videoCategories";
import { getVideos } from "@/app/api/videos/getVideos";

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
    return { title: "Category not found" };
  }

  return {
    title: `Video in category: ${foundCategory?.title}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  const foundCategory = VIDEO_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  if (!foundCategory) {
    return notFound();
  }

  try {
    const response = await getVideos({ categoryId });

    if (!response.ok) {
      throw new Error("No category data available");
    }

    const { data, categories } = response;

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
