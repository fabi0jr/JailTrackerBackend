import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { PrisonersService } from './prisoners.service';
import { CreatePrisonerDto } from './dto/create-prisoner.dto';
import { UpdatePrisonerDto } from './dto/update-prisoner.dto';
import { ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { monitorEventLoopDelay } from 'perf_hooks';
import { SolitariaDto } from './dto/solitaria.dto';

@Controller('prisoners')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PrisonersController {
  constructor(private readonly prisonersService: PrisonersService) {}
  
  @Get('ocupation-pavilhao')
  @ApiOperation({ summary: 'Taxa de ocupação' })
  ocupationRate() {
    return this.prisonersService.ocupationRate()
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo preso' })
  create(
    @Body() createPrisonerDto: CreatePrisonerDto, 
    @Req() request: any
  ) {

    const userId = request.user.userId;

    return this.prisonersService.create(createPrisonerDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Find All' })
  findAll() {
    return this.prisonersService.findAll();
  }

  @Get('solitaria')
  @ApiOperation({ summary: 'Listar todos os presos em solitária' })
  findAllSolitaria() {
    return this.prisonersService.findAllSolitaria()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find One by ID' })
  findOne(@Param('id') id: string) {
    return this.prisonersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update prisioner data' })
  update(
    @Param('id') id: string, 
    @Body() updatePrisonerDto: UpdatePrisonerDto,
    @Req() request: any
  ) {
    const userId = request.user.userId;
    return this.prisonersService.update(+id, updatePrisonerDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete prisioner' })
  remove(@Param('id') id: string) {
    return this.prisonersService.remove(+id);
  }

  @Post(':id/solitaria')
  @ApiOperation({ summary: 'Enviar preso para solitária' })
  enviarParaSolitaria(
    @Param('id', ParseIntPipe) id: number,
    @Body() solitariaDto: SolitariaDto,
    @Req() request: any,
  ){
    const userId = request.user.userId
    const dataFimConvertida = new Date(solitariaDto.dataFim)

    return this.prisonersService.enviarParaSolitaria(id, solitariaDto.motivo, dataFimConvertida, userId)

  }
}
