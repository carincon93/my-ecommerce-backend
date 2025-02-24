/*
  Warnings:

  - You are about to drop the column `product1Id` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `product2Id` on the `ProductVariant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId,variantId]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantId` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_product1Id_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_product2Id_fkey";

-- DropIndex
DROP INDEX "ProductVariant_product1Id_product2Id_key";

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "product1Id",
DROP COLUMN "product2Id",
ADD COLUMN     "productId" UUID NOT NULL,
ADD COLUMN     "variantId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_variantId_key" ON "ProductVariant"("productId", "variantId");

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
