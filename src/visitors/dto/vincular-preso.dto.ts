import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class VincularPresoDto {
    @ApiProperty({
        description: 'ID do preso ao qual o visitante será vinculado',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    prisonerId: number;

    @ApiProperty({
        description: 'Grau de parentesco ou tipo de relação com o preso',
        example: 'Advogado',
    })
    @IsString()
    @IsNotEmpty()
    tipoRelacao: string;
}