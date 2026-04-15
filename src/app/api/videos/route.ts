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
  const { videoId }: PostBody = await request.json();

  console.log(videoId);

  if (videosData.has(videoId)) {
    return Response.json(
      {
        ok: false,
        error: "The link to this video has already been added previously",
      },
      { status: 400 },
    );
  }

  videosData.add(videoId);

  return Response.json({ ok: true });
}
