/*
  Warnings:

  - The migration will change the primary key for the `Users` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Users` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
DROP COLUMN "role",
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "privilagies" (
    "roleId" SERIAL NOT NULL,
    "role" "Role" NOT NULL,

    PRIMARY KEY ("roleId")
);

-- AddForeignKey
ALTER TABLE "Users" ADD FOREIGN KEY ("roleId") REFERENCES "privilagies"("roleId") ON DELETE CASCADE ON UPDATE CASCADE;
