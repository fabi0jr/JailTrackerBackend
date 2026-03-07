/*
  Warnings:

  - Added the required column `criadorId` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "criadorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
