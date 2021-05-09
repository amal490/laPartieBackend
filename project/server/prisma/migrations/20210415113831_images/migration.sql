/*
  Warnings:

  - You are about to drop the column `defaultImage` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - The `status` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The migration will add a unique constraint covering the columns `[productIdForDefaultImage]` on the table `Image`. If there are existing duplicate values, the migration will fail.
  - Added the required column `productIdForImages` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productIdForDefaultImage` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('notActive', 'active', 'blocked');

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "productIdForImages" INTEGER NOT NULL,
ADD COLUMN     "productIdForDefaultImage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "defaultImage",
DROP COLUMN "images";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'notActive';

-- CreateIndex
CREATE UNIQUE INDEX "Image_productIdForDefaultImage_unique" ON "Image"("productIdForDefaultImage");

-- AddForeignKey
ALTER TABLE "Image" ADD FOREIGN KEY ("productIdForImages") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD FOREIGN KEY ("productIdForDefaultImage") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;
