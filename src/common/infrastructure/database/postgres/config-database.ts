import { TypeOrmModule } from "@nestjs/typeorm";

export const CONFIG_DATABASE_POSTGRES = (database, name, dir) =>  
  {


    return TypeOrmModule.forRootAsync({
      name: name,
      useFactory: () => {
        return {
          type: 'postgres',
          ssl: false as any,
          host: process.env.POSTGRES_HOST,
          port: +process.env.POSTGRES_PORT,
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASS,
          database: database,
          name: name,
          entities: [
            __dirname + `/../../../../${dir}/infrastructure/entities/postgres/*.entity{.ts,.js}`,
          ],
          synchronize: true
      }
      }
    })
  }


      // ssl: ( process.env.STATE === 'prod' ) 
    //   ? {
    //     rejectUnauthorized: false,
    //     sslmode: 'require',
    //   } 
    //   : false as any,