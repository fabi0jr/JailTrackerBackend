import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsDate } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsCPF } from 'class-validator-cpf';

export class CreatePrisonerDto {

  @ApiProperty({ 
  description: 'Foto do preso',
  type: 'string', 
  format: 'binary',
  required: false,
})
  file?: Express.Multer.File;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Fabio Junior' })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Solteiro' })
  estadoCivil: string;

  @IsString()
  @ApiProperty({ example: 'Jose Junior' })
  nomePai: string;

  @IsString()
  @ApiProperty({ example: 'Maria Silva' })
  nomeMae: string;

  @IsCPF()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '12345678900' })
  cpf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Roubo' })
  delito: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: 'true' })
  @Transform(({ value }) => value === 'true' || value === true)
  reicidencia: boolean;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({ example: '1990-01-01' })
  dataNasc: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Pavilhão A' })
  pavilhao: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Cela 1' })
  cela: string;
}
