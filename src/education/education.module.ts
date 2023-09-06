import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Education } from './entities/education.entity';

import { EducationController } from './education.controller';

import { EducationService } from './education.service';
import { UtilService } from 'src/shared/services/util.service';

@Module({
  imports: [TypeOrmModule.forFeature([Education])],
  controllers: [EducationController],
  providers: [EducationService, UtilService],
  exports: [EducationService],
})
export class EducationModule {}
