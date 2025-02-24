/*
  Warnings:

  - Added the required column `ecommerceId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "ecommerceId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_ecommerceId_fkey" FOREIGN KEY ("ecommerceId") REFERENCES "Ecommerce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
