/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productIdForDefaultImage_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productIdForImages_fkey";

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "DefaultImage" (
    "defaultImageId" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productIdForDefaultImage" INTEGER NOT NULL,

    PRIMARY KEY ("defaultImageId")
);

-- CreateTable
CREATE TABLE "Images" (
    "imagesId" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productIdForImages" INTEGER NOT NULL,

    PRIMARY KEY ("imagesId")
);

-- CreateIndex
CREATE UNIQUE INDEX "DefaultImage_productIdForDefaultImage_unique" ON "DefaultImage"("productIdForDefaultImage");

-- AddForeignKey
ALTER TABLE "DefaultImage" ADD FOREIGN KEY ("productIdForDefaultImage") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD FOREIGN KEY ("productIdForImages") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;
