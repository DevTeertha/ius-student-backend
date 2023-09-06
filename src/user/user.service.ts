import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { FindOneOptions, Repository, Entity } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = plainToClass(User, createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository.find();
  }

  async findOne(option: FindOneOptions<User>): Promise<UserDto> {
    return await this.userRepository.findOne(option);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const student = plainToClass(User, updateUserDto);
    await this.userRepository.update({ id }, { ...student });
    return await this.findOne({ where: { id } });
  }

  async remove(id: number): Promise<UserDto> {
    const findUser = await this.findOne({ where: { id } });
    await this.userRepository.delete(id);
    return findUser;
  }
}
