/*
  Warnings:

  - You are about to drop the column `quantite` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sousCategorieId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Categorie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SousCategorie` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SousCategorie" DROP CONSTRAINT "SousCategorie_categorieId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sousCategorieId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "quantite",
DROP COLUMN "sousCategorieId",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "subCategoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Categorie";

-- DropTable
DROP TABLE "SousCategorie";

-- CreateTable
CREATE TABLE "SubCategory" (
    "subCategoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("subCategoryId")
);

-- CreateTable
CREATE TABLE "Category" (
    "categoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("categoryId")
);

-- AddForeignKey
ALTER TABLE "SubCategory" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("subCategoryId") ON DELETE CASCADE ON UPDATE CASCADE;
