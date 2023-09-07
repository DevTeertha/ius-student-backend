import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UtilService } from '../shared/services/util.service';

import { LoginDto } from './dto/login.dto';
import { ResponseDTO } from '../shared/dto/response.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly utilService: UtilService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<ResponseDTO<LoginResponseDto>> {
    try {
      return this.utilService.successReponse(
        await this.authService.login(loginDto),
        'Login successful',
      );
    } catch (error) {
      throw new UnauthorizedException(
        this.utilService.errorReponse(error?.message),
      );
    }
  }
}
