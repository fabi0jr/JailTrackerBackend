import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class SolitariaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Motivo da solitária' })
    motivo: string

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: '2022-01-01' })
    dataFim: string

}