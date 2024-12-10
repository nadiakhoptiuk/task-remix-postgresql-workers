/*
  Warnings:

  - You are about to drop the column `location` on the `Location` table. All the data in the column will be lost.
  - Added the required column `columnId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rowIndex` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "location",
ADD COLUMN     "columnId" TEXT NOT NULL,
ADD COLUMN     "rowIndex" TEXT NOT NULL;
