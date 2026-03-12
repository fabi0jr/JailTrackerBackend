-- AlterTable
ALTER TABLE "Prisoner" ADD COLUMN     "dataFimSolitaria" TIMESTAMP(3),
ADD COLUMN     "naSolitaria" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataMovimentacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prisonerId" INTEGER NOT NULL,
    "criadorId" INTEGER NOT NULL,

    CONSTRAINT "Movimentacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_prisonerId_fkey" FOREIGN KEY ("prisonerId") REFERENCES "Prisoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
