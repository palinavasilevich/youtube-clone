export default async function Video({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const { videoId } = await params;
  return <div>Video Page {videoId}</div>;
}
