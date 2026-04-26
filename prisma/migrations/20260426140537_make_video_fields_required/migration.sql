/*
  Warnings:

  - Made the column `title` on table `videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author_name` on table `videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `author_url` on table `videos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category_id` on table `videos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "videos" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "author_name" SET NOT NULL,
ALTER COLUMN "author_url" SET NOT NULL,
ALTER COLUMN "category_id" SET NOT NULL;
