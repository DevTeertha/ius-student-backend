import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EducationModule } from './education/education.module';
import { ExperienceModule } from './experience/experience.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('MYSQL_HOST'),
        port: config.get('MYSQL_PORT'),
        username: config.get('MYSQL_USERNAME'),
        password: config.get('MYSQL_PASSWORD'),
        database: config.get('MYSQL_DB_NAME'),
        entities: [],
        autoLoadEntities: true,
        keepConnectionAlive: false,
        synchronize: true,
        extra: {
          decimalNumbers: true,
        },
        bigNumberStrings: false,
        logging: false,
      }),
    }),
    AuthModule,
    StudentModule,
    EducationModule,
    ExperienceModule,
    UserModule,
    MediaModule,
  ],
})
export class AppModule {}
