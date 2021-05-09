/*
  Warnings:

  - The migration will change the primary key for the `Users` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userid` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `privilagies` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[username]` on the table `Users`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[email]` on the table `Users`. If there are existing duplicate values, the migration will fail.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_roleId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "userid",
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD PRIMARY KEY ("userId");

-- DropTable
DROP TABLE "privilagies";

-- CreateTable
CREATE TABLE "Privilagies" (
    "roleId" SERIAL NOT NULL,
    "role" "Role" NOT NULL,

    PRIMARY KEY ("roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users.username_unique" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users.email_unique" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Users" ADD FOREIGN KEY ("roleId") REFERENCES "Privilagies"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;
