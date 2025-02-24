/*
  Warnings:

  - Added the required column `faviconDark` to the `Ecommerce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faviconLight` to the `Ecommerce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ecommerce" ADD COLUMN     "faviconDark" TEXT NOT NULL,
ADD COLUMN     "faviconLight" TEXT NOT NULL;
