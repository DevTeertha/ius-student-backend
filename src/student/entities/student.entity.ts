import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { BaseEntity } from 'src/shared/entity/base.entity';
import { Education } from 'src/education/entities/education.entity';
import { Experience } from 'src/experience/entities/experience.entity';

import {
  EGender,
  EMaritalStatus,
  EReligion,
  EStudentType,
} from '../enum/student.enum';

@Entity('students')
export class Student extends BaseEntity {
  @Column({ unique: true })
  studentId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'enum', enum: EStudentType, default: EStudentType.REGULAR })
  type: EStudentType;

  @Column({ type: 'enum', enum: EGender, default: EGender.MALE })
  gender: EGender;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column()
  country: string;

  @Column()
  presentAddress: string;

  @Column()
  permanentAddress: string;

  @Column({
    type: 'enum',
    enum: EMaritalStatus,
    default: EMaritalStatus.SINGLE,
    nullable: true,
  })
  maritalStatus: EMaritalStatus;

  @Column({
    type: 'enum',
    enum: EReligion,
    default: EReligion.HINDU,
    nullable: true,
  })
  religion: EReligion;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  fatherName: string;

  @Column({ nullable: true })
  fatherPhone: string;

  @Column({ nullable: true })
  motherName: string;

  @Column({ nullable: true })
  motherPhone: string;

  @OneToOne(() => Education, (education: Education) => education.student, {
    cascade: ['insert'],
  })
  education: Education;

  @OneToMany(() => Experience, (experience: Experience) => experience.student, {
    cascade: ['insert'],
  })
  experiences: Experience[];

  @BeforeInsert()
  insertDate() {
    this.createdAt = new Date().toUTCString();
  }

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date().toUTCString();
  }
}
