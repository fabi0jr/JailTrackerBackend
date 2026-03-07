import { Controller, Post, Get, Body, UseGuards, Req, ParseIntPipe, Param, Patch, Delete} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get()
    @ApiOperation({ summary: 'Find All' })
    findAll() {
        return this.usersService.findAll()
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get(':id')
    @ApiOperation({ summary: 'Find One by ID' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Patch(':id')
    @ApiOperation({ summary: 'Update user data' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return this.usersService.update(id, updateUserDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    remove(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.usersService.remove(id)
    }


}
