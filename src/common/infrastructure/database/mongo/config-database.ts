import { TypeOrmModule } from '@nestjs/typeorm';

export const CONFIG_DATABASE_MONGO = (url, connectionName, dir) => {
  return TypeOrmModule.forRootAsync({
    name: connectionName,
    useFactory: () => {
      return {
        type: 'mongodb',
        url: url,
        name: connectionName,
        entities: [
          __dirname + `/../../../../${dir}/infrastructure/entities/mongo/*.entity{.ts,.js}`,
        ],
        synchronize: true,
        useNewUrlParser: true
      }
    }
  })
}