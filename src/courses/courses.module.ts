import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule, MySQLModule, PostgresModule } from '@courses/modules/index';

@Module({})
export class CoursesModule {
  static register(): DynamicModule{
    let modules = { "MongoModule": MongoModule, "MySQLModule": MySQLModule, "PostgresModule": PostgresModule }
    let loadModule = modules[`${process.env.DB_PROVIDER}Module`];

    return {
      module: CoursesModule,
      imports: [loadModule],
      exports: [loadModule],
    };
  }
}
