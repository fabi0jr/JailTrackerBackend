import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VisitorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVisitorDto: CreateVisitorDto, userId: any) {
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
}
