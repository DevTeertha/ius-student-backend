import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CreateExperienceDto } from './create-experience.dto';
import { Student } from '../../student/entities/student.entity';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {
  @IsOptional()
  @ApiProperty({
    example: 'Mind Orbital Technologies',
    name: 'companyName',
    required: true,
  })
  companyName: string;

  @IsOptional()
  @ApiProperty({
    example: 'Full Time',
    name: 'jobType',
    required: true,
  })
  jobType: string;

  @IsOptional()
  @ApiProperty({
    example: '27 no college road',
    name: 'adress',
    required: true,
  })
  address: string;

  @IsOptional()
  @ApiProperty({
    example: 'Bangladesh',
    name: 'country',
    required: true,
  })
  country: string;

  @IsOptional()
  @ApiProperty({
    example: 'Software Engineer',
    name: 'designation',
    required: true,
  })
  designation: string;

  @IsOptional()
  @ApiProperty({
    example: new Date().toUTCString(),
    name: 'startFrom',
    required: true,
  })
  startFrom: string;

  @IsOptional()
  @ApiProperty({
    example: new Date().toUTCString(),
    name: 'endFrom',
    required: true,
  })
  endFrom: string;

  @IsOptional()
  @ApiProperty({
    example: true,
    name: 'isCurrentEmployee',
    required: true,
  })
  isCurrentEmployee: boolean;
}
