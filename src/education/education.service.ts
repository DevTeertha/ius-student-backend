import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { EducationDto } from './dto/education.dto';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

import { Education } from './entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {}

  async create(createEducationDto: CreateEducationDto) {
    return await this.educationRepository.save(createEducationDto);
  }

  async findAll(): Promise<EducationDto[]> {
    return await this.educationRepository.find();
  }

  async findOne(id: number): Promise<EducationDto> {
    return await this.educationRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateEducationDto: UpdateEducationDto,
  ): Promise<EducationDto> {
    const education = plainToClass(Education, updateEducationDto);
    await this.educationRepository.update({ id }, { ...education });
    return await this.findOne(id);
  }

  async remove(id: number): Promise<EducationDto> {
    const findEducation = await this.findOne(id);
    await this.educationRepository.delete(id);
    return findEducation;
  }
}
