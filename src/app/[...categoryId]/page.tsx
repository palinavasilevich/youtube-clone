export default async function Category({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  return <div>Category Page {categoryId}</div>;
}
