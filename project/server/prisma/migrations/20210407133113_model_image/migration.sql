/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[defaultImageId]` on the table `Product`. If there are existing duplicate values, the migration will fail.
  - Added the required column `defaultImageId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "defaultImageId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_defaultImageId_unique" ON "Product"("defaultImageId");

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("defaultImageId") REFERENCES "Image"("imageId") ON DELETE CASCADE ON UPDATE CASCADE;
