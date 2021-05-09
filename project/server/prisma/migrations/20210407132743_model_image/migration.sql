/*
  Warnings:

  - Added the required column `rating` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Product` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "rating" INTEGER NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "imageId" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    PRIMARY KEY ("imageId")
);
