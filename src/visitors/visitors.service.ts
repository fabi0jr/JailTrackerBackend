import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VisitorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVisitorDto: CreateVisitorDto, userId: number) {
    const visitorExists = await this.prisma.db.visitor.findUnique({
      where: { cpf: createVisitorDto.cpf },
    });

    if (visitorExists) {
      throw new ConflictException('Visitante ja cadastrado');
    }

    const newVisitor = await this.prisma.db.visitor.create({
      data: {
        ...createVisitorDto,
        criadorId: userId,
      },
    });

    return newVisitor;
  }

  async findAll() {
    return this.prisma.db.visitor.findMany();
  }

  async findOne(id: number) {
    const visitorExists = await this.prisma.db.visitor.findUnique({
      where: { id },
      include: {
        relacoes: {
          include: {
            prisoner: { select: { nome: true, pavilhao: true, cela: true } }
          }
        }
      }
    });

    if (!visitorExists) {
      throw new NotFoundException('Visitante não encontrado');
    }

    return visitorExists;
  }

  async update(id: number, updateVisitorDto: UpdateVisitorDto) {
    const visitorExists = await this.prisma.db.visitor.findUnique({
      where: { id },
    });

    if (!visitorExists) {
      throw new NotFoundException('Visitante não encontrado');
    }

    return this.prisma.db.visitor.update({
      where: { id },
      data: updateVisitorDto,
    });
  }

  async remove(id: number) {
    const visitorExists = await this.prisma.db.visitor.findUnique({
      where: { id },
    });

    if (!visitorExists) {
      throw new NotFoundException('Visitante não encontrado');
    }

    return this.prisma.db.visitor.delete({ where: { id } });
  }

  async vincularPreso(visitorId: number, prisonerId: number, tipoRelacao: string, userId: number) {
    const visitorExists = await this.prisma.db.visitor.findUnique({ where: { id: visitorId } });
    if (!visitorExists) throw new NotFoundException('Visitante não encontrado');

    const prisonerExists = await this.prisma.db.prisoner.findUnique({ where: { id: prisonerId } });
    if (!prisonerExists) throw new NotFoundException('Preso não encontrado');

    const relacaoExistente = await this.prisma.db.relacaoVisitantePreso.findUnique({
      where: {
        visitorId_prisonerId: {
          visitorId: visitorId,
          prisonerId: prisonerId,
        }
      }
    });

    if (relacaoExistente) {
      throw new ConflictException('Este visitante já está vinculado a este preso.');
    }

    const novaRelacao = await this.prisma.db.relacaoVisitantePreso.create({
      data: {
        visitorId,
        prisonerId,
        tipoRelacao,
        criadorId: userId,
      }
    });

    return novaRelacao;
  }
}
