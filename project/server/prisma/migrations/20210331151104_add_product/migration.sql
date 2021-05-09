-- DropIndex
DROP INDEX "Users.email_unique";

-- DropIndex
DROP INDEX "Users.username_unique";

-- CreateTable
CREATE TABLE "Product" (
    "productId" SERIAL NOT NULL,
    "name" TEXT,
    "price" INTEGER NOT NULL,
    "couleur" TEXT,
    "marque" TEXT,
    "code_prod" INTEGER NOT NULL,
    "taille" INTEGER NOT NULL,
    "disponibilite" BOOLEAN NOT NULL,

    PRIMARY KEY ("productId")
);
