import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service';
import { CreateMovimentacoeDto } from './dto/create-movimentacoe.dto';
import { UpdateMovimentacoeDto } from './dto/update-movimentacoe.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
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
