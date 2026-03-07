-- CreateTable
CREATE TABLE "Visit" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dataVisita" TIMESTAMP(3) NOT NULL,
    "horaEntrada" TEXT NOT NULL,
    "horaSaida" TEXT NOT NULL,
    "prisonerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_prisonerId_fkey" FOREIGN KEY ("prisonerId") REFERENCES "Prisoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
