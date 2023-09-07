import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { ExperienceDto } from './dto/experience.dto';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

import { Experience } from './entities/experience.entity';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
  ) {}

  async create(
    createExperienceDto: CreateExperienceDto,
  ): Promise<ExperienceDto> {
    const experience = plainToClass(Student, createExperienceDto);
    return await this.experienceRepository.save(experience);
  }

  async findAll(): Promise<ExperienceDto[]> {
    return await this.experienceRepository.find();
  }

  async findOne(id: number): Promise<ExperienceDto> {
    return await this.experienceRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateExperienceDto: UpdateExperienceDto,
  ): Promise<ExperienceDto> {
    const experience = plainToClass(Student, updateExperienceDto);
    await this.experienceRepository.update({ id }, { ...experience });
    return await this.findOne(id);
  }

  async remove(id: number): Promise<ExperienceDto> {
    const findExperience = await this.findOne(id);
    await this.experienceRepository.delete(id);
    return findExperience;
  }
}
