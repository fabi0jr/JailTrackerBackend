import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, ParseIntPipe, UploadedFile, BadRequestException } from '@nestjs/common';
import { PrisonersService } from './prisoners.service';
import { CreatePrisonerDto } from './dto/create-prisoner.dto';
import { UpdatePrisonerDto } from './dto/update-prisoner.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('prisoners')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PrisonersController {
  constructor(private readonly prisonersService: PrisonersService) {}
  

  @Post(':id/foto')
  @ApiOperation({ summary: 'Fazer upload da foto do preso' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        foto: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('foto'))
  uploadFoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Nenhum arquivo enviado');
    return this.prisonersService.uploadProfileImage(id, file);
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
