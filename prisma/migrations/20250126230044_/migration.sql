-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "trackingCompany" TEXT,
ADD COLUMN     "trackingUrl" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ALTER COLUMN "status" SET DEFAULT 'unpacked';
