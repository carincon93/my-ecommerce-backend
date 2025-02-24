/*
  Warnings:

  - You are about to drop the column `total` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ecommerce" ADD COLUMN     "freeShippingFrom" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "shipping" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "total";
