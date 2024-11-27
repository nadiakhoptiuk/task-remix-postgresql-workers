/*
  Warnings:

  - The primary key for the `UserTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,tagId]` on the table `UserTag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserTag" DROP CONSTRAINT "UserTag_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "UserTag_userId_tagId_key" ON "UserTag"("userId", "tagId");
