import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
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
    senha: string
}