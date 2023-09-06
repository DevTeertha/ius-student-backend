import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Student } from 'src/student/entities/student.entity';
import { BaseEntity } from 'src/shared/entity/base.entity';

@Entity('experiences')
export class Experience extends BaseEntity {
  @Column()
  companyName: string;

  @Column()
  jobType: string;

  @Column()
  address: string;

  @Column()
  country: string;

  @Column()
  designation: string;

  @Column()
  startFrom: string;

  @Column()
  endFrom: string;

  @Column({ default: true })
  isCurrentEmployee: boolean;

  @ManyToOne(() => Student, (student: Student) => student.experiences)
  @JoinColumn({ name: 'student', referencedColumnName: 'id' })
  student: Student | number;

  @BeforeInsert()
  insertDate() {
    this.createdAt = new Date().toUTCString();
  }

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date().toUTCString();
  }
}
