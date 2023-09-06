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

import { ExperienceService } from './experience.service';
import { UtilService } from 'src/shared/services/util.service';

import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ExperienceDto } from './dto/experience.dto';
import { ResponseDTO } from 'src/shared/dto/response.dto';

import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('experience')
@ApiTags('Experience')
export class ExperienceController {
  constructor(
    private readonly experienceService: ExperienceService,
    private readonly utilService: UtilService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async create(
    @Body() createExperienceDto: CreateExperienceDto,
  ): Promise<ResponseDTO<ExperienceDto>> {
    try {
      return this.utilService.successReponse(
        await this.experienceService.create(createExperienceDto),
        'Student created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Student cannot be created',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(): Promise<ResponseDTO<ExperienceDto[]>> {
    try {
      return this.utilService.successReponse(
        await this.experienceService.findAll(),
        'Student created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Student cannot be created',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseDTO<ExperienceDto>> {
    try {
      return this.utilService.successReponse(
        await this.experienceService.findOne(id),
        'Student created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Student cannot be created',
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
    @Body() updateExperienceDto: UpdateExperienceDto,
  ): Promise<ResponseDTO<ExperienceDto>> {
    try {
      return this.utilService.successReponse(
        await this.experienceService.update(id, updateExperienceDto),
        'Student created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Student cannot be created',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async remove(@Param('id') id: number): Promise<ResponseDTO<ExperienceDto>> {
    try {
      return this.utilService.successReponse(
        await this.experienceService.remove(id),
        'Student created successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Student cannot be created',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}
