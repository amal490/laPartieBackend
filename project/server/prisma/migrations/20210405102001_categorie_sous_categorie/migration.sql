/*
  Warnings:

  - You are about to drop the column `marque` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `disponibilite` on the `Product` table. All the data in the column will be lost.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sousCategorieId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "marque",
DROP COLUMN "disponibilite",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "sousCategorieId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "sousCategorie" (
    "sousCategorieId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CategorieId" INTEGER NOT NULL,

    PRIMARY KEY ("sousCategorieId")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "categorieId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("categorieId")
);

-- AddForeignKey
ALTER TABLE "sousCategorie" ADD FOREIGN KEY ("CategorieId") REFERENCES "Categorie"("categorieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("sousCategorieId") REFERENCES "sousCategorie"("sousCategorieId") ON DELETE CASCADE ON UPDATE CASCADE;
