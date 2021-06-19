// Import Driver to be used
import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

// Configuration properties for database
const database: Options = {
  driver: PostgreSqlDriver,
  dbName: 'mikro-test',
  type: "postgresql", // mongo || mariadb || mysql || postgresql || sqlite
  clientUrl: 'postgresql://postgres@localhost:5432',
  password: 'password',
};

export const env = {
  database,
};
