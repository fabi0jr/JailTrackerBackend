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
import { VisitorsService } from './visitors.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    email: string;
  };
}

@ApiTags('visitors')
@Controller('visitors')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo visitante' })
  create(
    @Body() createVisitorDto: CreateVisitorDto,
    @Req() request: AuthenticatedRequest,
  ) {
    const userId = request.user.userId;
    return this.visitorsService.create(createVisitorDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os visitantes' })
  findAll() {
    return this.visitorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um visitante por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.visitorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um visitante por ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVisitorDto: UpdateVisitorDto,
  ) {
    return this.visitorsService.update(id, updateVisitorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um visitante por ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.visitorsService.remove(id);
  }
}
