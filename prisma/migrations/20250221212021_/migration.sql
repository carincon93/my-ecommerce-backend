/*
  Warnings:

  - You are about to drop the column `paymentMethodsImage` on the `Ecommerce` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ecommerce" DROP COLUMN "paymentMethodsImage",
ADD COLUMN     "paymentMethodsImageDark" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "paymentMethodsImageLight" TEXT NOT NULL DEFAULT '';
