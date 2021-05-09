/*
  Warnings:

  - You are about to drop the `sousCategorie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sousCategorie" DROP CONSTRAINT "sousCategorie_CategorieId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sousCategorieId_fkey";

-- DropTable
DROP TABLE "sousCategorie";

-- CreateTable
CREATE TABLE "SousCategorie" (
    "sousCategorieId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categorieId" INTEGER NOT NULL,

    PRIMARY KEY ("sousCategorieId")
);

-- AddForeignKey
ALTER TABLE "SousCategorie" ADD FOREIGN KEY ("categorieId") REFERENCES "Categorie"("categorieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("sousCategorieId") REFERENCES "SousCategorie"("sousCategorieId") ON DELETE CASCADE ON UPDATE CASCADE;
