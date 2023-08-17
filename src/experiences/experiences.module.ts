import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule, MySQLModule, PostgresModule } from '@experiences/modules/index';


@Module({})
export class ExperiencesModule {
  static register(): DynamicModule {
    let modules = { "MongoModule": MongoModule, "MySQLModule": MySQLModule, "PostgresModule": PostgresModule }
    let loadModule = modules[`${process.env.DB_PROVIDER}Module`];

    return {
      module: ExperiencesModule,
      imports: [loadModule],
      exports: [loadModule],
    };
  }
}
