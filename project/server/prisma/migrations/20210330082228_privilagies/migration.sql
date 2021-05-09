/*
  Warnings:

  - The migration will change the primary key for the `Users` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "userid" SERIAL NOT NULL,
ADD PRIMARY KEY ("userid");
