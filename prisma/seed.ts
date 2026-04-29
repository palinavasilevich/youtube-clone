import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./schema/generated/client";
import { fetchVideoInfo } from "../src/app/api/videos/fetchVideoInfo";
import { VideoCategoryId } from "@/shared/constants/videoCategories";

type SeedVideos = {
  youtubeId: string;
  categoryId: VideoCategoryId;
};

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });

const prisma = new PrismaClient({ adapter });

const SEED_USER_ID = "seed-user-0";

const seedVideos: SeedVideos[] = [
  { youtubeId: "BXv8NUSOZko", categoryId: "education" },
  { youtubeId: "3Mbynm0pGX0", categoryId: "entertainment" },
  { youtubeId: "tPbcKWppmko", categoryId: "music" },
  { youtubeId: "04cJF4oLxOw", categoryId: "gaming" },
  { youtubeId: "IuTDuvYr7f0", categoryId: "travel" },
  { youtubeId: "6LOaOvujfEA", categoryId: "science" },
];

async function main() {
  await prisma.user.upsert({
    where: { id: SEED_USER_ID },
    update: {},
    create: {
      id: SEED_USER_ID,
      username: "seed_user",
      password: "not-a-real-password",
    },
  });

  let seeded = 0;

  for (const { youtubeId, categoryId } of seedVideos) {
    const info = await fetchVideoInfo(youtubeId);
    if (!info) {
      console.warn(`Could not fetch info for ${youtubeId}, skipping.`);
      continue;
    }

    await prisma.video.upsert({
      where: { youtubeId },
      update: {
        categoryId,
        title: info.title,
        description: info.description,
        views: info.viewCount,
        authorName: info.authorName,
        authorUrl: info.authorUrl,
        authorUsername: info.authorUsername,
        channelThumbnail: info.channelThumbnail,
        publishedAt: info.publishedAt,
      },
      create: {
        youtubeId,
        userId: SEED_USER_ID,
        categoryId,
        title: info.title,
        description: info.description,
        views: info.viewCount,
        authorName: info.authorName,
        authorUrl: info.authorUrl,
        authorUsername: info.authorUsername,
        channelThumbnail: info.channelThumbnail,
        publishedAt: info.publishedAt,
      },
    });

    seeded++;
  }

  console.log(`Seeded ${seeded} videos.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
