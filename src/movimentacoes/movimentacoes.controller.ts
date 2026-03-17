import {
  Controller,
  Get,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('movimentacoes')
@Controller('movimentacoes')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todo o historico de movimentações (Geral)' })
  findAll() {
    return this.movimentacoesService.findAll();
  }

  @Get('prisoner/:prisonerId')
  @ApiOperation({ summary: 'Buscar historico de um preso específico' })
  findByPrisoner(@Param('prisonerId', ParseIntPipe) prisonerId: number) {
    return this.movimentacoesService.findByPrisoner(prisonerId);
  }
}
