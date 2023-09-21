import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ExperienceResponseDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'Mind Orbital Technologies',
    name: 'companyName',
    required: true,
  })
  companyName: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Full Time',
    name: 'jobType',
    required: true,
  })
  jobType: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '27 no college road',
    name: 'adress',
    required: true,
  })
  address: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Bangladesh',
    name: 'country',
    required: true,
  })
  country: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Software Engineer',
    name: 'designation',
    required: true,
  })
  designation: string;

  @IsNotEmpty()
  @ApiProperty({
    example: new Date().toUTCString(),
    name: 'startFrom',
    required: true,
  })
  startFrom: string;

  @IsNotEmpty()
  @ApiProperty({
    example: new Date().toUTCString(),
    name: 'endFrom',
    required: true,
  })
  endFrom: string;

  @IsNotEmpty()
  @ApiProperty({
    example: true,
    name: 'isCurrentEmployee',
    required: true,
  })
  isCurrentEmployee: boolean;
}
