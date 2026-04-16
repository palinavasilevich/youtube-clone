import { PostVideoRequest, PostVideoResponse } from "@/shared/types/api.types";

type PostBody = {
  videoId: string;
};

const videosData = new Set<string>();

export async function GET() {
  videosData.add("hXYHZVMHec0");
  videosData.add("3KZnAVWL5IQ");

  return Response.json({ ok: true, data: Array.from(videosData) });
}

export async function POST(request: Request): Promise<Response> {
  const body: PostVideoRequest = await request.json();

  if (videosData.has(body.videoId)) {
    const res: PostVideoResponse = {
      ok: false,
      error: "The link to this video has already been added previously",
    };

    return Response.json(res, { status: 400 });
  }

  videosData.add(body.videoId);

  const res: PostVideoResponse = { ok: true };

  return Response.json(res);
}
