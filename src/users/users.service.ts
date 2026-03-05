import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
    
    async create(createUserDto: CreateUserDto) {
        const userExists = await this.prisma.db.user.findUnique({
            where: { email: createUserDto.email },
        })

        if (userExists){
            throw new BadRequestException('Este Email ja esta em uso');
        }

        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.senha, saltOrRounds);

        const newUser = await this.prisma.db.user.create({
            data: {
                ...createUserDto,
                senha: hashedPassword
            },
        });
        const { senha, ...userSemSenha } = newUser
        return userSemSenha;
    }

    async findAll() {
        const users = await this.prisma.db.user.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                endereco: true,
            }
        })
        
        return users
    }

    async findOne(id: number) {
        const user = await this.prisma.db.user.findUnique({
            where: { id: id },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                endereco: true,
            }
        })
        return user
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        if (updateUserDto.senha) {
            updateUserDto.senha = await bcrypt.hash(updateUserDto.senha, 10)
        }

        const updateUser = await this.prisma.db.user.update({
            where: { id: id },
            data: updateUserDto,
            select:{
                id: true,
                nome: true,
                email: true,
                telefone: true,
                endereco: true,
            }
        })
        return updateUser
    }

    async remove(id: number) {
        await this.prisma.db.user.delete({
            where: { id: id },
        })
        return { message: 'Usuário deletado com sucesso!' }
    }
}
