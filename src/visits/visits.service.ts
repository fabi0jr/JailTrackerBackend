import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class VisitsService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async checkVisit(){
    const hoje = new Date()
    hoje.setUTCHours(0,0,0,0)
    const horaAtualObj = new Date();
    const horarioAtualStr = `${horaAtualObj.getHours().toString().padStart(2, '0')}:${horaAtualObj.getMinutes().toString().padStart(2, '0')}`;

    await this.prisma.db.visit.updateMany({
      where: {
        status: false,
        OR: [
          { dataVisita: { lt:hoje } },
          { 
            dataVisita: { equals:hoje }, 
            horaSaida: { lt: horarioAtualStr } 
          }
        ]
      },
      data: {
        status: true,
      },
    })
  }

  async create(createVisitDto: CreateVisitDto, userId: any) {
    const { visitorId, prisonerId, ...visitData } = createVisitDto;

    const visitorInfo = await this.prisma.db.visitor.findUnique({
      where: { id: visitorId },
    });

    if (!visitorInfo) {
      throw new NotFoundException('Visitante não encontrado');
    }

    const prisonerInfo = await this.prisma.db.prisoner.findUnique({
      where: { id: prisonerId },
    });

    if (!prisonerInfo) {
      throw new NotFoundException('Preso não encontrado');
    }

    const newVisit = await this.prisma.db.visit.create({
      data: {
        ...visitData,
        visitorId,
        prisonerId,
        criadorId: userId,
      },
    });

    return newVisit;
  }

  async findAll() {
    return this.prisma.db.visit.findMany({
      orderBy: { dataVisita: 'desc' },
      include: {
        visitor: true,
        prisoner: true,
        criador: {select: {nome: true}},
      }
    });
  }

  async findOne(id: number) {
    const visitExists = await this.prisma.db.visit.findUnique({
      where: { id },
    });

    if (!visitExists) {
      throw new NotFoundException('Visita não encontrada');
    }

    return visitExists;
  }

  async update(id: number, updateVisitDto: UpdateVisitDto) {
    const visitExists = await this.prisma.db.visit.findUnique({
      where: { id },
    });

    if (!visitExists) {
      throw new NotFoundException('Visita não encontrada');
    }

    return this.prisma.db.visit.update({
      where: { id },
      data: updateVisitDto,
    });
  }

  async remove(id: number) {
    const visitExists = await this.prisma.db.visit.findUnique({
      where: { id },
    });

    if (!visitExists) {
      throw new NotFoundException('Visita não encontrada');
    }

    return this.prisma.db.visit.delete({ where: { id } });
  }
}
