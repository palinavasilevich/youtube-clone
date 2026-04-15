import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video: ...",
};

type VideoPageProps = {
  params: Promise<{ videoId: string }>;
};

export default async function VideoPage({ params }: VideoPageProps) {
  const { videoId } = await params;
  return <div>Video Page: {videoId}</div>;
}
