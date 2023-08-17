import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule, MySQLModule, PostgresModule } from '@educations/modules/index';

@Module({})
export class EducationsModule {
  static register(): DynamicModule {
    let modules = { "MongoModule": MongoModule, "MySQLModule": MySQLModule, "PostgresModule": PostgresModule }
    let loadModule = modules[`${process.env.DB_PROVIDER}Module`];

    return {
      module: EducationsModule,
      imports: [loadModule],
      exports: [loadModule],
    };
  }
}
