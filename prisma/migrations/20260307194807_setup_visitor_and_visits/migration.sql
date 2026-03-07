/*
  Warnings:

  - You are about to drop the column `cpf` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Visit` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Visit` table. All the data in the column will be lost.
  - Added the required column `dataVisita` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horaEntrada` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horaSaida` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prisonerId` to the `Visit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visitorId` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Visit_cpf_key";

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "cpf",
DROP COLUMN "nome",
DROP COLUMN "telefone",
ADD COLUMN     "dataVisita" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "horaEntrada" TEXT NOT NULL,
ADD COLUMN     "horaSaida" TEXT NOT NULL,
ADD COLUMN     "prisonerId" INTEGER NOT NULL,
ADD COLUMN     "visitorId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Visitor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "criadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_cpf_key" ON "Visitor"("cpf");

-- AddForeignKey
ALTER TABLE "Visitor" ADD CONSTRAINT "Visitor_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_prisonerId_fkey" FOREIGN KEY ("prisonerId") REFERENCES "Prisoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
