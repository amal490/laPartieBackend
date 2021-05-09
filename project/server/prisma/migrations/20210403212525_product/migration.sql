/*
  Warnings:

  - Made the column `name` on table `Users` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `username` on table `Users` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Users` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `password` on table `Users` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL;
