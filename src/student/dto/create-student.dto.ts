import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

import {
  EStudentType,
  EGender,
  EMaritalStatus,
  EReligion,
} from '../enum/student.enum';

import { ExperienceDto } from '../../experience/dto/experience.dto';
import { CreateEducationDto } from '../../education/dto/create-education.dto';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '212010110', name: 'studentId', required: true })
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
  @IsOptional()
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
  @IsOptional()
  @ApiProperty({ example: 'Bangladesh', name: 'imgUrl', required: true })
  imgUrl: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'devteertha28@gmail.com',
    name: 'email',
    required: false,
    nullable: true,
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
  @IsOptional()
  @ApiProperty({ example: '123456789789', name: 'fatherPhone', required: true })
  fatherPhone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Rita Sarker', name: 'motherName', required: true })
  motherName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '123456789789', name: 'motherPhone', required: true })
  motherPhone: string;

  @IsNotEmpty()
  @ApiProperty({ type: CreateEducationDto, name: 'education' })
  education: CreateEducationDto;

  @IsOptional()
  @ApiProperty({
    type: [ExperienceDto],
    example: [
      {
        companyName: 'Mind Orbital Technologies',
        jobType: 'Full Time',
        adress: '27 no college road',
        country: 'Bangladesh',
        designation: 'Software Engineer',
        startFrom: 'Fri, 25 Aug 2023 17:35:58 GMT',
        endFrom: 'Fri, 25 Aug 2023 17:35:58 GMT',
        isCurrentEmployee: true,
        student: 1,
      },
    ],
    isArray: true,
    name: 'experiences',
    required: true,
  })
  experiences: ExperienceDto[];
}
