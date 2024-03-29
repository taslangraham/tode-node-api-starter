/**
 * Loads in application environment variables
 */
import { config as initEnv } from 'dotenv';
import { Base10 } from "./src/config/constants";
initEnv();

interface Process extends NodeJS.ProcessEnv {
  DB_NAME: string;
  DB_CLIENT: string;
  DB_PORT: string;
  DB_PASSWORD: string;
  DB_USER: string;
  JWT_SECRET: string;
  IS_DB_ENABLED: string;
  DB_HOST: string;
}

const processEnv = process.env as Process;
// Configuration properties for database
const database = {
  isEnabled: processEnv.IS_DB_ENABLED === 'true' ? true : false,
  client: processEnv.DB_CLIENT,
  name: processEnv.DB_NAME,
  user: processEnv.DB_USER,
  password: processEnv.DB_PASSWORD,
  port: Number.parseInt(processEnv.DB_PORT, Base10),
  host: processEnv.DB_HOST,
  seeds: {
    directory: 'src\\database\\seeders'
  },
  migrations: {
    tableName: "knex_migrations",
    directory: 'src\\database\\migrations',
  },
};

const projectDirectory = __dirname;

export const env = {
  database,
  JWT_SECRET: processEnv.JWT_SECRET,
  projectDirectory,
};
