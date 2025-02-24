/*
  Warnings:

  - You are about to drop the `ProductVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_variantId_fkey";

-- DropTable
DROP TABLE "ProductVariant";

-- CreateTable
CREATE TABLE "VariantProduct" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productId" UUID NOT NULL,
    "variantId" UUID NOT NULL,

    CONSTRAINT "VariantProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VariantProduct_productId_variantId_key" ON "VariantProduct"("productId", "variantId");

-- AddForeignKey
ALTER TABLE "VariantProduct" ADD CONSTRAINT "VariantProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantProduct" ADD CONSTRAINT "VariantProduct_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
