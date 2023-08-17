import { DynamicModule, Module } from '@nestjs/common';
import { MongoModule, MySQLModule, PostgresModule } from '@certifications/modules/index';

@Module({})
export class CertificationsModule {
  static register(): DynamicModule {
    let modules = { "MongoModule": MongoModule, "MySQLModule": MySQLModule, "PostgresModule": PostgresModule }
    let loadModule = modules[`${process.env.DB_PROVIDER}Module`];

    return {
      module: CertificationsModule,
      imports: [loadModule],
      exports: [loadModule],
    };
  }
}
