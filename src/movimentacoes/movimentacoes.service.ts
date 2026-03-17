import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovimentacoesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.db.movimentacao.findMany({
      orderBy: { dataMovimentacao: 'desc' },
      include: {
        prisoner: { select: { nome: true, cpf: true } },
        criador: { select: { nome: true } },
      },
    });
  }

  async findByPrisoner(prisonerId: number) {
    return this.prisma.db.movimentacao.findMany({
      where: { prisonerId: prisonerId },
      orderBy: { dataMovimentacao: 'desc' },
      include: {
        criador: { select: { nome: true } },
      },
    });
  }
}
