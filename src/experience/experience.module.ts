import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Experience } from './entities/experience.entity';

import { ExperienceController } from './experience.controller';

import { ExperienceService } from './experience.service';
import { UtilService } from '../shared/services/util.service';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  controllers: [ExperienceController],
  providers: [ExperienceService, UtilService],
  exports: [ExperienceService],
})
export class ExperienceModule {}
