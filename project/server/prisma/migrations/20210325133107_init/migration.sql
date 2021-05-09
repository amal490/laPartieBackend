-- CreateEnum
CREATE TYPE "Role" AS ENUM ('INTERNAUTE', 'CLIENT', 'ADMIN');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "role" "Role" NOT NULL DEFAULT E'INTERNAUTE',

    PRIMARY KEY ("id")
);
