import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export class CreateVisitorDto {
  @ApiProperty({
    description: 'Nome do visitante',
    example: 'João Silva',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    description: 'CPF do visitante',
    example: '12345678909',
  })
  @IsCPF()
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    description: 'Telefone do visitante',
    example: '12345678909',
  })
  @IsString()
  @IsNotEmpty()
  telefone: string;
}
