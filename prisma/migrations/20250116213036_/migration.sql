-- CreateTable
CREATE TABLE "Ecommerce" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "tiktok" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ecommerce_pkey" PRIMARY KEY ("id")
);
