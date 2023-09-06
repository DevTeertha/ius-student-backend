import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

import { EUserType } from '../enum/user.enum';
import { Exclude } from 'class-transformer';

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Tertha Dev', name: 'firstName' })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Sarker', name: 'lastName' })
  lastName: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'admin', name: 'lastName' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'devteertha28@gmail.com', name: 'email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'admin', name: 'password' })
  @Exclude()
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'enum',
    enum: EUserType,
    example: EUserType.ADMIN,
    name: 'type',
  })
  type: EUserType;
}
