import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule, MySQLModule, PostgresModule } from '@presentations/modules/index';

@Module({})
export class PresentationsModule {
  static register(): DynamicModule {
    let modules = { "MongoModule": MongoModule, "MySQLModule": MySQLModule, "PostgresModule": PostgresModule }
    let loadModule = modules[`${process.env.DB_PROVIDER}Module`];

    return {
      module: PresentationsModule,
      imports: [loadModule],
      exports: [loadModule],
    };
  }
}
