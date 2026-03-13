import { BadGatewayException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrisonerDto } from './dto/create-prisoner.dto';
import { UpdatePrisonerDto } from './dto/update-prisoner.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrisonersService {
  constructor(private readonly prisma: PrismaService){}
  
  async create(createPrisonerDto: CreatePrisonerDto, userId: number) {
    const userExists = await this.prisma.db.prisoner.findUnique({
      where: { cpf: createPrisonerDto.cpf },
    })
    if (userExists) {
      throw new ConflictException('Este CPF ja esta em uso');
    }

    const newPrisoner = await this.prisma.db.prisoner.create({
      data: {
        ...createPrisonerDto,   
        criadorId: userId,
      }
    })

    return newPrisoner;

  }

  async findAll() {
    return this.prisma.db.prisoner.findMany()
  }

  async findOne(id: number) {
    const prisonerExists = await this.prisma.db.prisoner.findUnique({
      where: { id: id }
    })

    if (!prisonerExists) {
      throw new NotFoundException('Preso não encontrado')
    }
    
    return prisonerExists;
  }

  async update(id: number, updatePrisonerDto: UpdatePrisonerDto, userId: number) {
    const prisonerExists = await this.prisma.db.prisoner.findUnique({
      where: { id: id },
    })

    if (!prisonerExists) {
      throw new NotFoundException('Preso não encontrado');
    }

    const mudouCela = updatePrisonerDto.cela &&  updatePrisonerDto.cela !== prisonerExists.cela;
    const mudouPavilhao = updatePrisonerDto.pavilhao && updatePrisonerDto.pavilhao !== prisonerExists.pavilhao;

    const updatedPrisoner = await this.prisma.db.prisoner.update({
      where: { id },
      data: updatePrisonerDto,
    });

    if (mudouCela || mudouPavilhao) {
      const destinoPavilhao = updatePrisonerDto.pavilhao || prisonerExists.pavilhao;
      const destinoCela = updatePrisonerDto.cela || prisonerExists.cela;

      await this.prisma.db.movimentacao.create({
        data: {
          tipo: 'TRANSFERENCIA',
          descricao: `Transferência de [${prisonerExists.pavilhao} - ${prisonerExists.cela}] para [${destinoPavilhao} - ${destinoCela}]`,
          prisonerId: id,
          criadorId: userId,
        }
      })
    }

    return updatedPrisoner;
  }

  async remove(id: number) {
    const prisonerExists = await this.prisma.db.prisoner.findUnique({
      where: { id: id }
    })

    if (!prisonerExists) {
      throw new NotFoundException('Preso não encontrado')
    }
    await this.prisma.db.prisoner.delete({
      where: { id: id },
    })
    return { message: 'Preso deletado com sucesso!' }
  }

  async enviarParaSolitaria(id: number, motivo: string, dataFim: Date, userId: number) {
    const prisoner = await this.prisma.db.prisoner.findUnique({
      where: { id: id }
  })

  if (!prisoner) {
    throw new NotFoundException('Preso não encontrado')
  }
  if (prisoner.naSolitaria){
    throw new ConflictException('Preso ja esta em solitária')
  }

  const updatePrisoner = await this.prisma.db.prisoner.update({
    where: { id },
    data: {
      naSolitaria: true,
      dataFimSolitaria: dataFim
    }
  })

  await this.prisma.db.movimentacao.create({
    data: {
      tipo: 'ENTRADA_SOLITARIA',
      descricao: `Enviado para a solitária. Motivo: ${motivo}. Previsão de saída: ${dataFim.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`,
      prisonerId: id,
      criadorId: userId,
    }
  })

  return updatePrisoner

  }

  async findAllSolitaria() {
    
    const prisoners = await this.prisma.db.prisoner.findMany({
      where: { naSolitaria: true },
    })

    return prisoners

  }

  async ocupationRate() {
    const pavilhao = await this.prisma.db.prisoner.groupBy({
      by: ['pavilhao'],
      _count: {
        id: true
      }
    })
    return pavilhao
  }

}
