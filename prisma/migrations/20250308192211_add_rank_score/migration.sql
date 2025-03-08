/*
  Warnings:

  - Added the required column `rank` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Leaderboard" ADD COLUMN     "rank" INTEGER NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL;
