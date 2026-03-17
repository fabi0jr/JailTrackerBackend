import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({
    description: 'O refresh token gerado no momento do login',
  })
  refresh_token: string;
}
