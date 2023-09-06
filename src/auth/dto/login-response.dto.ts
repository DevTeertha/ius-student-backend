import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty({ description: 'access_token field' })
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
