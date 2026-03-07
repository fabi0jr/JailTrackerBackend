/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Visit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Visit_cpf_key" ON "Visit"("cpf");
