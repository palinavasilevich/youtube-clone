type PostBody = {
  videoId: string;
};

const videosData = new Set<string>();

export async function GET() {
  return Response.json({ ok: true, data: Array.from(videosData) });
}

export async function POST(request: Request): Promise<Response> {
  const { videoId }: PostBody = await request.json();

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
