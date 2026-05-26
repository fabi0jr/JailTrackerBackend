import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) {}

    async findVisitsToday() {
        const dataAtual = new Date();
        return this.prisma.db.visit.findMany({
            //pegar somente a data e comparar somente com a data atual
            where: {
                dataVisita: {
                    gte: new Date().toISOString().split('T')[0] + 'T00:00:00.000Z',
                    lte: new Date().toISOString().split('T')[0] + 'T23:59:59.999Z'
                }
            },
            include: {
                visitor: true,
                prisoner: true,
            },
        })
    }

    async findPrisionersInSolitary() {
        return this.prisma.db.prisoner.findMany({
            where: {
                naSolitaria: true,
            },
            include: {
                criador: true,
            },
        })
    }

    async occupationRate() {
        return this.prisma.db.prisoner.groupBy({
            by: ['pavilhao'],
            _count: {
                id: true,
            },
        })
    }
}
