import { TypeOrmModule } from "@nestjs/typeorm";

export const CONFIG_DATABASE_MYSQL = (database, name, dir) =>
	{
		return TypeOrmModule.forRootAsync({
			name: name,
			useFactory: () => {
				return {
					type: 'mysql',
					host: process.env.MYSQL_HOST,
					port: +process.env.MYSQL_PORT,
					username: process.env.MYSQL_USER,
					password: process.env.MYSQL_PASS,
					database:database,
					name: name,
					entities: [
						__dirname + `/../../../../${dir}/infrastructure/entities/mysql/*.entity{.ts,.js}`,
					],
					synchronize: true,
				}
			}
		})
	}