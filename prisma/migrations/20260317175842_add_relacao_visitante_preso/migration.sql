-- CreateTable
CREATE TABLE "RelacaoVisitantePreso" (
    "id" SERIAL NOT NULL,
    "tipoRelacao" TEXT NOT NULL,
    "visitorId" INTEGER NOT NULL,
    "prisonerId" INTEGER NOT NULL,
    "criadorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelacaoVisitantePreso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RelacaoVisitantePreso_visitorId_prisonerId_key" ON "RelacaoVisitantePreso"("visitorId", "prisonerId");

-- AddForeignKey
ALTER TABLE "RelacaoVisitantePreso" ADD CONSTRAINT "RelacaoVisitantePreso_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelacaoVisitantePreso" ADD CONSTRAINT "RelacaoVisitantePreso_prisonerId_fkey" FOREIGN KEY ("prisonerId") REFERENCES "Prisoner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelacaoVisitantePreso" ADD CONSTRAINT "RelacaoVisitantePreso_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
