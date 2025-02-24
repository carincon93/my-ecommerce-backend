/*
  Warnings:

  - You are about to drop the column `telephone` on the `Ecommerce` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Product` table. All the data in the column will be lost.
  - Added the required column `email` to the `Ecommerce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `Ecommerce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorHex` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ecommerce" DROP COLUMN "telephone",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL,
ALTER COLUMN "instagram" DROP NOT NULL,
ALTER COLUMN "tiktok" DROP NOT NULL,
ALTER COLUMN "facebook" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "color",
ADD COLUMN     "colorHex" TEXT NOT NULL,
ADD COLUMN     "colorName" TEXT NOT NULL;
