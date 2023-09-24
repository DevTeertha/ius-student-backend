import { MediaService } from './../media/media.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { FindOneOptions, Repository } from 'typeorm';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ExperienceDto } from '../experience/dto/experience.dto';
import { StudentDto, StudentPaginationResponseDto } from './dto/student.dto';

import { Student } from './entities/student.entity';
import { Experience } from '../experience/entities/experience.entity';
import { Education } from '../education/entities/education.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Experience)
    private experienceRepository: Repository<Experience>,
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    private mediaService: MediaService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<StudentDto> {
    const student = plainToClass(Student, createStudentDto);
    const existingStudent = await this.findByFields({
      where: {
        studentId: student.studentId,
      },
    });
    if (existingStudent) {
      throw new HttpException('Student id already exist', HttpStatus.FOUND);
    }
    return await this.studentRepository.save(student);
  }

  async findAll({
    offset,
    limit,
    searchText,
  }: {
    offset: number;
    limit: number;
    searchText: string;
  }): Promise<StudentPaginationResponseDto> {
    const findQuery = this.studentRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.experiences', 'experience')
      .leftJoinAndSelect('student.education', 'education');

    if (searchText) {
      findQuery.where((qb) => {
        qb.where(
          'CONCAT(student.firstName, " ", student.lastName) LIKE :searchText',
          {
            searchText: `%${searchText}%`,
          },
        )
          .orWhere('student.studentId LIKE :searchText', { searchText })
          .orWhere('student.email LIKE :searchText', {
            searchText: `%${searchText}%`,
          })
          .orWhere('student.phone LIKE :searchText', {
            searchText: `%${searchText}%`,
          })
          .orWhere('education.department LIKE :searchText', {
            searchText: `%${searchText}%`,
          });
      });
    }

    if (offset) {
      findQuery.offset(offset);
    }

    if (limit) {
      findQuery.limit(limit);
    }

    const [students, count] = await findQuery.getManyAndCount();
    return {
      count,
      students,
    };
  }

  async findOne(id: number): Promise<StudentDto> {
    return await this.studentRepository.findOne({
      where: [{ studentId: id }, { id }],
      relations: ['experiences', 'education'],
    });
  }

  async findByFields(options: FindOneOptions<Student>): Promise<StudentDto> {
    return await this.studentRepository.findOne(options);
  }

  async update(
    studentId: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentDto> {
    const student = plainToClass(Student, updateStudentDto);
    const existingStudent = await this.findOne(studentId);

    if (!existingStudent) {
      throw new NotFoundException('Student not found!');
    }

    await this.experienceRepository.delete({ student: existingStudent.id });
    if (student?.experiences?.length) {
      const experienceResponse = new Promise((resolve) => {
        resolve(
          student?.experiences?.map((experience: ExperienceDto) => {
            return {
              ...experience,
              student: existingStudent.id,
            };
          }),
        );
      });
      const newExperiences = await experienceResponse;
      await this.experienceRepository.save(newExperiences);
    }

    if (student?.education) {
      student.education?.id &&
        (await this.educationRepository.delete(student.education.id));

      await this.educationRepository.save({
        ...student.education,
        student: existingStudent.id,
      });
    }

    delete student.experiences;
    delete student.education;

    await this.studentRepository.update(
      { studentId: studentId },
      { ...student },
    );
    return await this.findOne(studentId);
  }

  async remove(id: number): Promise<StudentDto> {
    const findStudent = await this.findOne(id);
    if (findStudent?.imgUrl) {
      try {
        await this.mediaService.deleteFile(findStudent.imgUrl);
      } catch (error) {
        await this.studentRepository.delete({ studentId: id });
      }
    }
    await this.studentRepository.delete({ studentId: id });
    return findStudent;
  }
}
