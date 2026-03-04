import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}

    async login (logindto: LoginDto) {
        const user = await this.prisma.db.user.findUnique({
            where: { email: logindto.email }
        });

        if (!user) { throw new UnauthorizedException('Email ou senha incorreta') }

        const isPasswordValid = await bcrypt.compare(logindto.senha, user.senha)
        if (!isPasswordValid) { throw new UnauthorizedException('Email ou senha incorreta') }

        return { message: "Login efetuado com sucesso! Pronto para gerar o Token." };
  }
}
