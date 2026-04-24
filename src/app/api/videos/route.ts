import { NextResponse } from "next/server";
import prisma from "@/shared/lib/prisma";

export async function GET(): Promise<NextResponse> {
  try {
    const videos = await prisma.video.findMany();
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 },
    );
  }
}
