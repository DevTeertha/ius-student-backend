import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

import { EUserType } from '../enum/user.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @ApiProperty({ example: 'Tertha Dev', name: 'firstName' })
  firstName?: string;

  @IsOptional()
  @ApiProperty({ example: 'Sarker', name: 'lastName' })
  lastName?: string;

  @IsOptional()
  @ApiProperty({ example: 'Sarker', name: 'lastName' })
  username?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ example: 'devteertha28@gmail.com', name: 'email' })
  email?: string;

  @IsOptional()
  @ApiProperty({ example: '123456', name: 'password' })
  password?: string;

  @IsOptional()
  @ApiProperty({
    type: 'enum',
    enum: EUserType,
    example: EUserType.ADMIN,
    name: 'type',
  })
  type?: EUserType;
}
