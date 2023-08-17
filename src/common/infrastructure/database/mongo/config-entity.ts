import { TypeOrmModule } from "@nestjs/typeorm";


export const CONFIG_DATABASE_MONGO_ENTITY = (entity, name) => 
  TypeOrmModule.forFeature([entity], name)