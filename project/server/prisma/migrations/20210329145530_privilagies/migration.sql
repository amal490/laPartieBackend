/*
  Warnings:

  - The migration will change the primary key for the `Users` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");
