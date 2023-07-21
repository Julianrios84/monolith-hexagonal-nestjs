import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule } from '@nestjs/config';
import {
  CONFIG_DATABASE,
  CONFIG_DATABASE_CERTIFICATIONS,
  CONFIG_DATABASE_COURSES,
  CONFIG_DATABASE_CURRICULUMS,
  CONFIG_DATABASE_EDUCATIONS,
  CONFIG_DATABASE_EXPERIENCES,
  CONFIG_DATABASE_PERSONALS,
  CONFIG_DATABASE_PRESENTATIONS,
  CONFIG_DATABASE_PROJECTS,
  CONFIG_DATABASE_SKILLS,
  CONFIG_DATABASE_USERS,
} from './common/infrastructure/database';
import { UsersModule } from './users/users.module';
import { SkillsModule } from './skills/skills.module';
import { ProjectsModule } from './projects/projects.module';
import { PresentationsModule } from './presentations/presentations.module';
import { PersonalsModule } from './personals/personals.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { EducationsModule } from './educations/educations.module';
import { CurriculumsModule } from './curriculums/curriculums.module';
import { CoursesModule } from './courses/courses.module';
import { CertificationsModule } from './certifications/certifications.module';
import { Connection } from './common/domain/constants';

@Module({
  imports: [
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    CONFIG_DATABASE(process.env.URI_MONGODB_USERS, Connection.user.name),
    CONFIG_DATABASE(process.env.URI_MONGODB_SKILLS, Connection.skill.name),
    CONFIG_DATABASE(process.env.URI_MONGODB_PROJECTS, Connection.projects.name),
    CONFIG_DATABASE(process.env.URI_MONGODB_PRESENTATIONS, Connection.presentations.name),
    CONFIG_DATABASE(process.env.URI_MONGODB_PERSONALS, Connection.personals.name),
    CONFIG_DATABASE(process.env.URI_MONGODB_EXPERIENCES, Connection.experiences.name),
    CONFIG_DATABASE(process.env.URI_MONGODB_EDUCATIONS, Connection.educations.name),
    CONFIG_DATABASE(process.env.URI_MONGODB_CURRICULUMS, Connection.curriculums.name),
    CONFIG_DATABASE(process.env.URI_MONGODB_COURSES, Connection.courses.name),
    CONFIG_DATABASE(process.env.URI_MONGODB_CERTIFICATIONS, Connection.certifications.name),
    // CONFIG_DATABASE_USERS(),
    // CONFIG_DATABASE_SKILLS(),
    // CONFIG_DATABASE_PROJECTS(),
    // CONFIG_DATABASE_PRESENTATIONS(),
    // CONFIG_DATABASE_PERSONALS(),
    // CONFIG_DATABASE_EXPERIENCES(),
    // CONFIG_DATABASE_EDUCATIONS(),
    // CONFIG_DATABASE_CURRICULUMS(),
    // CONFIG_DATABASE_COURSES(),
    // CONFIG_DATABASE_CERTIFICATIONS(),
    AuthModule,
    UsersModule,
    SkillsModule,
    ProjectsModule,
    PresentationsModule,
    PersonalsModule,
    ExperiencesModule,
    EducationsModule,
    CurriculumsModule,
    CoursesModule,
    CertificationsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
