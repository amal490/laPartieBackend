/*
  Warnings:

  - You are about to drop the column `productId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `defaultImageId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `defaultImage` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_defaultImageId_fkey";

-- DropIndex
DROP INDEX "Product_defaultImageId_unique";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "defaultImageId",
ADD COLUMN     "defaultImage" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "code" INTEGER NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "roleId" SET DEFAULT 3;
