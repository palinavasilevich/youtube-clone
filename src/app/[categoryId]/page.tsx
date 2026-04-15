import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video in category: ...",
};

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;
  return <div>Category Page: {categoryId}</div>;
}
