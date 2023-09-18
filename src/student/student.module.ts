import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentController } from './student.controller';

import { StudentService } from './student.service';
import { UtilService } from '../shared/services/util.service';

import { Student } from './entities/student.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Education } from 'src/education/entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Experience, Education])],
  controllers: [StudentController],
  providers: [StudentService, UtilService],
  exports: [StudentService],
})
export class StudentModule {}
