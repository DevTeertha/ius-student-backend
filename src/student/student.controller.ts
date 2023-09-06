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
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

import { StudentService } from './student.service';
import { UtilService } from 'src/shared/services/util.service';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ResponseDTO } from 'src/shared/dto/response.dto';
import { StudentDto, StudentPaginationResponseDto } from './dto/student.dto';

import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Controller('students')
@ApiTags('Student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly utilService: UtilService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<ResponseDTO<StudentDto>> {
    try {
      return this.utilService.successReponse(
        await this.studentService.create(createStudentDto),
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
  @ApiQuery({
    name: 'offset',
    required: false,
    type: String,
    description: 'Page Number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Page Limit',
  })
  @ApiQuery({
    name: 'searchText',
    required: false,
    type: String,
    description:
      'Search by student name, department, student ID, email, phone no',
  })
  async findAll(
    @Query()
    {
      offset,
      limit,
      searchText,
    }: {
      offset: number;
      limit: number;
      searchText: string;
    },
  ): Promise<ResponseDTO<StudentPaginationResponseDto>> {
    try {
      const { count, students } = await this.studentService.findAll({
        offset,
        limit,
        searchText,
      });
      return this.utilService.successReponse(
        { count, students },
        'Student record successfully retrieved',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Student record cannot be retrieved',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseDTO<StudentDto>> {
    try {
      return this.utilService.successReponse(
        await this.studentService.findOne(id),
        'Student successfully retrieved',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Student cannot be retrieved',
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
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<ResponseDTO<StudentDto>> {
    try {
      return this.utilService.successReponse(
        await this.studentService.update(id, updateStudentDto),
        'Student updated successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Student cannot be updated',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  async remove(@Param('id') id: number): Promise<ResponseDTO<StudentDto>> {
    try {
      return this.utilService.successReponse(
        await this.studentService.remove(id),
        'Student removed successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'Student cannot be removed',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}
