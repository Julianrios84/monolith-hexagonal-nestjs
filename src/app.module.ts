import { DynamicModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@users/root/users.module';
import { SkillsModule } from '@skills/root/skills.module';
import { ProjectsModule } from '@projects/root/projects.module';
import { AuthModule } from '@auth/root/auth.module';
import { PresentationsModule } from '@presentations/root/presentations.module';
import { PersonalsModule } from '@personals/root/personals.module';
import { ExperiencesModule } from '@experiences/root/experiences.module';
import { EducationsModule } from '@educations/root/educations.module';
import { CurriculumsModule } from '@curriculums/root/curriculums.module';
import { CoursesModule } from '@courses/root/courses.module';
import { CertificationsModule } from '@certifications/root/certifications.module';
import { CONNECTION  } from './common/infrastructure/connection';

@Module({})
export class AppModule {
  static register() : DynamicModule {
    
    return {
      module: AppModule,
      imports: [
        AutomapperModule.forRoot({ strategyInitializer: classes() }),
        ConfigModule.forRoot({
          envFilePath: ['.env'],
          isGlobal: true,
        }),
        ...CONNECTION(),
        AuthModule.register(),
        UsersModule.register(),
        SkillsModule.register(),
        ProjectsModule.register(),
        PresentationsModule.register(),
        PersonalsModule.register(),
        ExperiencesModule.register(),
        EducationsModule.register(),
        CurriculumsModule.register(),
        CoursesModule.register(),
        CertificationsModule.register(),
      ],
      controllers: [AppController],
      providers: [
      ],
      exports: [],
    }
  }
}
