import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { EDegreeType } from './../enum/education.enum';

import { Student } from '../../student/entities/student.entity';

export class EducationDto {
  @IsOptional()
  @ApiProperty({ example: 140 })
  credits: number;

  @IsOptional()
  @ApiProperty({
    type: EDegreeType,
    default: EDegreeType.BSC,
    enum: EDegreeType,
  })
  degreeType: EDegreeType;

  @IsOptional()
  @ApiProperty({ example: 'Computer Science & Engineering' })
  department: string;

  @IsOptional()
  @ApiProperty({ example: 10 })
  batch: number;

  @IsOptional()
  @ApiProperty({ example: 2017 })
  seassonYear: number;

  @IsOptional()
  @ApiProperty({ example: 2024 })
  graduationYear: number;

  @IsOptional()
  @ApiProperty({ type: Student, example: Student })
  student: Student | number;
}
