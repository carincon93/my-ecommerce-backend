/*
  Warnings:

  - You are about to drop the `VariantProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VariantProduct" DROP CONSTRAINT "VariantProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "VariantProduct" DROP CONSTRAINT "VariantProduct_variantId_fkey";

-- DropTable
DROP TABLE "VariantProduct";

-- CreateTable
CREATE TABLE "ProductVariant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "variantId" UUID NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_productId_variantId_key" ON "ProductVariant"("productId", "variantId");

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
