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

import { EducationService } from './education.service';
import { UtilService } from '../shared/services/util.service';

import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ResponseDTO } from '../shared/dto/response.dto';
import { EducationDto } from './dto/education.dto';

import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';

@Controller('education')
@ApiTags('Education')
export class EducationController {
  constructor(
    private readonly educationService: EducationService,
    private readonly utilService: UtilService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async create(
    @Body() createEducationDto: CreateEducationDto,
  ): Promise<ResponseDTO<EducationDto>> {
    try {
      return this.utilService.successReponse(
        await this.educationService.create(createEducationDto),
        'Education created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Education cannot be created',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(): Promise<ResponseDTO<EducationDto[]>> {
    try {
      return this.utilService.successReponse(
        await this.educationService.findAll(),
        'Education created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Education cannot be created',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseDTO<EducationDto>> {
    try {
      return this.utilService.successReponse(
        await this.educationService.findOne(id),
        'Education created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Education cannot be created',
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
    @Body() updateEducationDto: UpdateEducationDto,
  ): Promise<ResponseDTO<EducationDto>> {
    try {
      return this.utilService.successReponse(
        await this.educationService.update(id, updateEducationDto),
        'Education created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Education cannot be created',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async remove(@Param('id') id: number): Promise<ResponseDTO<EducationDto>> {
    try {
      return this.utilService.successReponse(
        await this.educationService.remove(id),
        'Education created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Education cannot be created',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}
