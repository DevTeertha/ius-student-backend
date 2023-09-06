import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';

import { CreateEducationDto } from './create-education.dto';

import { EDegreeType } from '../enum/education.enum';

export class UpdateEducationDto extends PartialType(CreateEducationDto) {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 140 })
  credits?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'The International University Of Scholars' })
  instituteName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: EDegreeType,
    default: EDegreeType.BSC,
    enum: EDegreeType,
  })
  degreeType?: EDegreeType;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Bachelor of Science' })
  degreeName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Computer Science & Engineering' })
  department?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 10 })
  batch?: number;

  @IsOptional()
  @ApiProperty({ example: 2018 })
  seassonYear?: number;

  @IsOptional()
  @ApiProperty({ example: 2024 })
  graduationYear?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  isCurrent?: boolean;
}
