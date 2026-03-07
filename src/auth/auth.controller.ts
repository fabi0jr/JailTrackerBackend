import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() LoginDto: LoginDto){
        return this.authService.login(LoginDto)
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Body() refreshDto: RefreshDto) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshDto.refresh_token, { 
                secret: process.env.JWT_REFRESH_SECRET
            });

            const newAccessToken = await this.jwtService.signAsync(
                { sub: payload.sub, email: payload.email }, 
                { secret: process.env.JWT_SECRET, expiresIn: '15m' }
            );

            console.log('Novo access token gerado:', process.env.JWT_SECRET);
            return {
                access_token: newAccessToken,
            };

        } catch (error) {
            throw new UnauthorizedException('Refresh token inválido ou expirado');
        }
    }

}
