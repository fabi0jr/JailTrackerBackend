import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(logindto: LoginDto) {
    const user = await this.prisma.db.user.findUnique({
      where: { email: logindto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorreta');
    }

    const isPasswordValid = await bcrypt.compare(logindto.senha, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha incorreta');
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
