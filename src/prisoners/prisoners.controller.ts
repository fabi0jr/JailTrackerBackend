import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PrisonersService } from './prisoners.service';
import { CreatePrisonerDto } from './dto/create-prisoner.dto';
import { UpdatePrisonerDto } from './dto/update-prisoner.dto';
import { ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('prisoners')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PrisonersController {
  constructor(private readonly prisonersService: PrisonersService) {}
  
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

  @Get(':id')
  @ApiOperation({ summary: 'Find One by ID' })
  findOne(@Param('id') id: string) {
    return this.prisonersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update prisioner data' })
  update(@Param('id') id: string, @Body() updatePrisonerDto: UpdatePrisonerDto) {
    return this.prisonersService.update(+id, updatePrisonerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete prisioner' })
  remove(@Param('id') id: string) {
    return this.prisonersService.remove(+id);
  }
}
