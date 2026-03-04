import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

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
}
