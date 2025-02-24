/*
  Warnings:

  - You are about to drop the column `logo` on the `Ecommerce` table. All the data in the column will be lost.
  - Added the required column `logoDark` to the `Ecommerce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoLight` to the `Ecommerce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ecommerce" DROP COLUMN "logo",
ADD COLUMN     "logoDark" TEXT NOT NULL,
ADD COLUMN     "logoLight" TEXT NOT NULL;
