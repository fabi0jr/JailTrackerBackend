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
  UseInterceptors,
  ParseIntPipe,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { PrisonersService } from './prisoners.service';
import { CreatePrisonerDto } from './dto/create-prisoner.dto';
import { UpdatePrisonerDto } from './dto/update-prisoner.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { SolitariaDto } from './dto/solitaria.dto';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
  };
}

@Controller('prisoners')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Prisoners')
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

  @Get('ocupation-pavilhao')
  @ApiOperation({ summary: 'Taxa de ocupação' })
  ocupationRate() {
    return this.prisonersService.ocupationRate();
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo preso' })
  create(
    @Body() createPrisonerDto: CreatePrisonerDto,
    @Req() request: AuthenticatedRequest,
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
    return this.prisonersService.findAllSolitaria();
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
    @Req() request: AuthenticatedRequest,
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
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.userId;
    const dataFimConvertida = new Date(solitariaDto.dataFim);

    return this.prisonersService.enviarParaSolitaria(
      id,
      solitariaDto.motivo,
      dataFimConvertida,
      userId,
    );
  }
}
