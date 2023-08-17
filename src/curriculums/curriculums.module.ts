import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule, MySQLModule, PostgresModule } from '@curriculums/modules/index';

@Module({})
export class CurriculumsModule {
  static register(): DynamicModule {
    let modules = { "MongoModule": MongoModule, "MySQLModule": MySQLModule, "PostgresModule": PostgresModule }
    let loadModule = modules[`${process.env.DB_PROVIDER}Module`];

    return {
      module: CurriculumsModule,
      imports: [loadModule],
      exports: [loadModule],
    };
  }
}
