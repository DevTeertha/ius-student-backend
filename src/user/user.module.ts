import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UtilService } from 'src/shared/services/util.service';

import { UserController } from './user.controller';

import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UtilService],
  exports: [UserService],
})
export class UserModule {}
