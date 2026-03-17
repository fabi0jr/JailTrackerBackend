import { BadGatewayException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrisonerDto } from './dto/create-prisoner.dto';
import { UpdatePrisonerDto } from './dto/update-prisoner.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class PrisonersService {
  constructor(private readonly prisma: PrismaService, private readonly uploadsService: UploadsService){}
  
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
    
    return this.prisma.db.prisoner.findUnique({
      where: { id },
    })
  }

  async update(id: number, updatePrisonerDto: UpdatePrisonerDto) {
    const prisonerExists = await this.prisma.db.prisoner.findUnique({
      where: { id: id },
    })

    if (!prisonerExists) {
      throw new NotFoundException('Preso não encontrado');
    }

    const updatedPrisoner = await this.prisma.db.prisoner.update({
      where: { id },
      data: updatePrisonerDto,
    });

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

  async uploadProfileImage(id: number, file: Express.Multer.File) {
    const prisonerExists = await this.prisma.db.prisoner.findUnique({
      where: { id: id },
    })

    if (!prisonerExists) {
      throw new NotFoundException('Preso não encontrado');
    }

    const imageUrl = await this.uploadsService.uploadFile(file);

    const updatedPrisoner = await this.prisma.db.prisoner.update({
      where: { id },
      data: { foto: imageUrl },
    });

    return updatedPrisoner;
  }
}
