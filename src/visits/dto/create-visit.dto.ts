import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVisitDto {

    @ApiProperty({
        description: 'Data da visita',
        example: '2022-01-01',
    })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    dataVisita: string;

    @ApiProperty({
        description: 'Hora de entrada',
        example: '10:00',
    })
    @IsString()
    @IsNotEmpty()
    horaEntrada: string;

    @ApiProperty({
        description: 'Hora de saída',
        example: '12:00',
    })
    @IsString()
    @IsNotEmpty()
    horaSaida: string;

    @ApiProperty({
        description: 'ID do visitante',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    visitorId: number;

    @ApiProperty({
        description: 'ID do preso',
        example: '1',
    })
    @IsNumber()
    @IsNotEmpty()
    prisonerId: number;

}
