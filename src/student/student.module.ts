import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaModule } from 'src/media/media.module';

import { StudentController } from './student.controller';

import { StudentService } from './student.service';
import { UtilService } from '../shared/services/util.service';

import { Student } from './entities/student.entity';
import { Experience } from '../experience/entities/experience.entity';
import { Education } from '../education/entities/education.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Experience, Education]),
    MediaModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, UtilService],
  exports: [StudentService],
})
export class StudentModule {}
