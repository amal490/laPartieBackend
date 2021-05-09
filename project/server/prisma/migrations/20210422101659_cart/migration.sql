-- CreateEnum
CREATE TYPE "Validate" AS ENUM ('VALID', 'NOTVALID');

-- CreateTable
CREATE TABLE "Cart" (
    "cartId" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "validate" "Validate" NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    PRIMARY KEY ("cartId")
);

-- AddForeignKey
ALTER TABLE "Cart" ADD FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;
