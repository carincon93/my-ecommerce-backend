/*
  Warnings:

  - A unique constraint covering the columns `[product1Id,product2Id]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_product1Id_product2Id_key" ON "ProductVariant"("product1Id", "product2Id");
