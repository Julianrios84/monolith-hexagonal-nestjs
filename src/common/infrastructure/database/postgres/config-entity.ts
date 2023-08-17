import { TypeOrmModule } from "@nestjs/typeorm";


export const CONFIG_DATABASE_POSTGRES_ENTITY = (table, name) => {
  return TypeOrmModule.forFeature([table], name)
}