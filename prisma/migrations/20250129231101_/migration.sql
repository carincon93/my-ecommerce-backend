/*
  Warnings:

  - Added the required column `dniNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dniType` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "dniNumber" TEXT NOT NULL,
ADD COLUMN     "dniType" TEXT NOT NULL;
