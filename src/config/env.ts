/**
 * Loads in application environment variables
 */

// Import Driver to be used
import { Configuration } from "@mikro-orm/core";
import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { config as initEnv } from 'dotenv';
import { Base10 } from "./constants";
initEnv();

interface Process extends NodeJS.ProcessEnv {
  DB_NAME: string;
  DB_TYPE: string;
  DB_CLIENT_URL: string;
  DB_PORT: string;
  DB_PASSWORD: string;
  JWT_SECRET: string;
}

const processEnv = process.env as Process;

// Configuration properties for database
const database: Options = {
  driver: PostgreSqlDriver,
  dbName: processEnv.DB_NAME,
  // Currently, only supports 'postgresql'
  // Coming soon - mongo || mariadb || mysql || postgresql || sqlite
  type: processEnv.DB_TYPE as keyof typeof Configuration.PLATFORMS,
  clientUrl: processEnv.DB_CLIENT_URL,
  port: Number.parseInt(processEnv.DB_PORT, Base10),
  password: processEnv.DB_PASSWORD,
};

export const env = {
  database,
  JWT_SECRET: processEnv.JWT_SECRET,
};
