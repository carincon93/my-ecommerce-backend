/*
  Warnings:

  - Added the required column `title` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethodsImage` to the `Ecommerce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ecommerce" ADD COLUMN     "paymentMethodsImage" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "priceBeforeOff" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Policy" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "ecommerceId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_ecommerceId_fkey" FOREIGN KEY ("ecommerceId") REFERENCES "Ecommerce"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
