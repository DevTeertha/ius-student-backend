import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UtilService } from '../shared/services/util.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDTO } from '../shared/dto/response.dto';
import { UserDto } from './dto/user.dto';

import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly utilService: UtilService,
  ) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseDTO<UserDto>> {
    try {
      return this.utilService.successReponse(
        await this.userService.create(createUserDto),
        'User created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'User cannot be created',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async findAll(): Promise<ResponseDTO<UserDto[]>> {
    try {
      return this.utilService.successReponse(
        await this.userService.findAll(),
        'User successfully retrieved',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'User cannot be retrieved',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async findOne(@Param('id') id: number): Promise<ResponseDTO<UserDto>> {
    try {
      return this.utilService.successReponse(
        await this.userService.findOne({ where: { id } }),
        'User successfully retrieved',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'User cannot be retrieved',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseDTO<UserDto>> {
    try {
      return this.utilService.successReponse(
        await this.userService.update(id, updateUserDto),
        'User updated successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'User cannot be updated',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async remove(@Param('id') id: number): Promise<ResponseDTO<UserDto>> {
    try {
      return this.utilService.successReponse(
        await this.userService.remove(id),
        'User deleted successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'User cannot be deleted',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}
