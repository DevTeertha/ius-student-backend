import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

import { EDegreeType } from '../enum/education.enum';

export class CreateEducationDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 140 })
  credits: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: EDegreeType,
    default: EDegreeType.BSC,
    enum: EDegreeType,
  })
  degreeType: EDegreeType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Computer Science & Engineering' })
  department: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 10 })
  batch: number;

  @IsNotEmpty()
  @ApiProperty({ example: 2018 })
  seassonYear: number;

  @IsOptional()
  @ApiProperty({ example: 2024 })
  graduationYear: number;
}
