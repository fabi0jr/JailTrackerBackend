/*
  Warnings:

  - You are about to drop the column `horaEntrada` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `horaSaida` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `prisonerId` on the `Visit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_prisonerId_fkey";

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "horaEntrada",
DROP COLUMN "horaSaida",
DROP COLUMN "prisonerId";
