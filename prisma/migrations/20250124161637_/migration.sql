/*
  Warnings:

  - Added the required column `ecommerceId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "ecommerceId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_ecommerceId_fkey" FOREIGN KEY ("ecommerceId") REFERENCES "Ecommerce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
