import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./schema/generated/client";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });

const prisma = new PrismaClient({ adapter });

const SEED_USER_ID = "seed-user-0";

const youtubeIds = [
  "hXYHZVMHec0",
  "3KZnAVWL5IQ",
  "dQw4w9WgXcQ",
  "oHAmjGo7h58",
  "At2gVjhf9Ac",
  "ssoCumPEH0g",
  "BXv8NUSOZko",
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

  await prisma.video.createMany({
    data: youtubeIds.map((youtubeId) => ({ youtubeId, userId: SEED_USER_ID })),
    skipDuplicates: true,
  });

  console.log(`Seeded ${youtubeIds.length} videos.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
