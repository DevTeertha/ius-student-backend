import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Student } from './entities/student.entity';

import { StudentController } from './student.controller';

import { StudentService } from './student.service';
import { UtilService } from '../shared/services/util.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService, UtilService],
  exports: [StudentService],
})
export class StudentModule {}
