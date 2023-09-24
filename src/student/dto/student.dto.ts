import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import {
  EGender,
  EMaritalStatus,
  EReligion,
  EStudentType,
} from '../enum/student.enum';

import { CreateEducationDto } from '../../education/dto/create-education.dto';
import { BaseDto } from '../../shared/dto/base.dto';

export class StudentPaginationResponseDto {
  count: number;
  students: StudentDto[];
}

export class StudentDto extends BaseDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 212010110, name: 'studentId', required: true })
  studentId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Teertha Dev', name: 'firstName', required: true })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Sarker', name: 'lastName', required: true })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'enum',
    enum: EStudentType,
    example: EStudentType.REGULAR,
    name: 'type',
    required: true,
  })
  type: EStudentType;

  @IsNotEmpty()
  @ApiProperty({
    type: 'enum',
    enum: EGender,
    example: EGender.MALE,
    name: 'gender',
    required: true,
  })
  gender: EGender;

  @IsNotEmpty()
  @ApiProperty({
    example: new Date().toUTCString(),
    name: 'dateOfBirth',
    required: true,
  })
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Bangladesh', name: 'country', required: true })
  country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Bangladesh',
    name: 'presentAddress',
    required: true,
  })
  presentAddress: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Bangladesh',
    name: 'permanentAddress',
    required: true,
  })
  permanentAddress: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'enum',
    enum: EMaritalStatus,
    example: EMaritalStatus.SINGLE,
    name: 'maritalStatus',
    required: true,
  })
  maritalStatus: EMaritalStatus;

  @IsNotEmpty()
  @ApiProperty({
    type: 'enum',
    enum: EReligion,
    example: EReligion.HINDU,
    name: 'religion',
    required: true,
  })
  religion: EReligion;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Bangladesh', name: 'imgUrl', required: true })
  imgUrl: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'devteertha28@gmail.com',
    name: 'email',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '01672066834', name: 'phone', required: true })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Phanindra Sarker',
    name: 'fatherName',
    required: true,
  })
  fatherName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456789789', name: 'fatherPhone', required: true })
  fatherPhone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Rita Sarker', name: 'motherName', required: true })
  motherName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456789789', name: 'motherPhone', required: true })
  motherPhone: string;

  @IsNotEmpty()
  @ApiProperty({ type: CreateEducationDto, name: 'education' })
  education: CreateEducationDto;

  experiences: any[];
}
