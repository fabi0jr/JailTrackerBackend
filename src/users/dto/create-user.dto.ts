import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ 
    description: 'O nome completo do usuário', 
    example: 'Lorem Ipsum' 
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ 
    description: 'O email do usuário', 
    example: 'lorem@ipsum.com' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'A senha do usuário', 
    example: 'senha123' 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  senha: string;

  @ApiProperty({ 
    description: 'O telefone do usuário', 
    example: '(11) 99999-9999' 
  })
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @ApiProperty({ 
    description: 'O endereço do usuário', 
    example: 'Rua Lorem Ipsum, 123' 
  })
  @IsString()
  @IsNotEmpty()
  endereco: string;
}