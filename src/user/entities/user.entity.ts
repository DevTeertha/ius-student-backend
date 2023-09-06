import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { EUserType } from '../enum/user.enum';

import { BaseEntity } from 'src/shared/entity/base.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: EUserType, default: EUserType.ADMIN })
  type: EUserType;

  @BeforeInsert()
  async hashingPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
