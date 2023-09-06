import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const existingUser = await this.userService.findOne({
      where: [{ email: loginDto.username }, { username: loginDto.username }],
    });

    if (!existingUser) {
      throw new NotFoundException('User not found!');
    }

    const isMatched = await bcrypt.compare(
      loginDto.password,
      existingUser.password,
    );

    if (!isMatched) {
      throw new NotFoundException('Wrong password!');
    }

    delete existingUser.password;

    const access_token = await this.jwtService.signAsync({ ...existingUser });

    return { access_token };
  }
}
