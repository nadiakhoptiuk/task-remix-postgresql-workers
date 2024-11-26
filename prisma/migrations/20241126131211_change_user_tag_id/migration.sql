-- DropIndex
DROP INDEX "UserTag_userId_tagId_key";

-- AlterTable
ALTER TABLE "UserTag" ADD CONSTRAINT "UserTag_pkey" PRIMARY KEY ("userId", "tagId");
