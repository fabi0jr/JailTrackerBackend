import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('visits')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo registro de visita' })
  create(@Body() createVisitDto: CreateVisitDto, @Req() request: any) {
    const userId = request.user.userId;
    return this.visitsService.create(createVisitDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as visitas' })
  findAll() {
    return this.visitsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma visita por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.visitsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma visita por ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVisitDto: UpdateVisitDto,
  ) {
    return this.visitsService.update(id, updateVisitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma visita por ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.visitsService.remove(id);
  }
}
