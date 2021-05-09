/*
  Warnings:

  - You are about to drop the column `couleur` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `taille` on the `Product` table. All the data in the column will be lost.
  - Added the required column `quantite` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "couleur",
DROP COLUMN "taille",
ADD COLUMN     "quantite" INTEGER NOT NULL;
