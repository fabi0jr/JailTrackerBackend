-- CreateTable
CREATE TABLE "Prisoner" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "nomePai" TEXT NOT NULL,
    "nomeMae" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "delito" TEXT NOT NULL,
    "reicidencia" BOOLEAN NOT NULL DEFAULT false,
    "dataNasc" TIMESTAMP(3) NOT NULL,
    "pavilhao" TEXT NOT NULL,
    "cela" TEXT NOT NULL,
    "foto" TEXT,
    "criadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prisoner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prisoner_cpf_key" ON "Prisoner"("cpf");

-- AddForeignKey
ALTER TABLE "Prisoner" ADD CONSTRAINT "Prisoner_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
