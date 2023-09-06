import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true, select: false })
  createdAt?: string;

  @Column({ nullable: true, select: false })
  updatedAt?: string;

  /* Cannot add referrence with user entity because of seeding failed! */
  /* TypeError: Class extends value undefined is not a constructor or null */
  @Column({ nullable: true, select: false })
  updatedBy?: number;

  @Column({ nullable: true, select: false })
  createdBy?: number;
}
