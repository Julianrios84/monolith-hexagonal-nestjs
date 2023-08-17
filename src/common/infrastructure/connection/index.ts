import { MONGO_CONNECTIONS } from './mongo.connection';
import { MYSQL_CONNECTIONS } from './mysql.connection';
import { POSTGRES_CONNECTIONS } from './postgres.connection';


export const CONNECTION = () => {
  switch (process.env.DB_PROVIDER) {
    case "Mongo":
      return MONGO_CONNECTIONS();
    case "MySQL":
      return MYSQL_CONNECTIONS();
    case "Postgres":
      return POSTGRES_CONNECTIONS();
  }
}
