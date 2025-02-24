/*
  Warnings:

  - You are about to drop the column `mobile` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "mobile",
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "isSizeGuide" BOOLEAN NOT NULL DEFAULT false;
