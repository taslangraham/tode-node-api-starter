// This file holds the configuration for the ORM used, MikroORM
// Learn more - https://mikro-orm.io/docs/installation for more details

import {
  FileCacheAdapter,
  MikroORM, Options,
  ReflectMetadataProvider,
  UnderscoreNamingStrategy,
} from '@mikro-orm/core';

import { env } from "../env";
const { database } = env;

const options: Options = {
  ...database,
  forceEntityConstructor: true,
  discovery: {
    warnWhenNoEntities: false,
    alwaysAnalyseProperties: true,
  },
  metadataProvider: ReflectMetadataProvider,
  // points to compiled js files,
  entities: ['./dist/src/models/index.entity.js'],
  // path to your TS entities (source), relative to `baseDir`
  entitiesTs: ['./src/models/index.entity.ts'],
  namingStrategy: UnderscoreNamingStrategy,
  validate: true,
  strict: true,
  debug: true,
  cache: {
    enabled: true,
    pretty: false, // allows to pretty print the JSON cache
    adapter: FileCacheAdapter, // you can provide your own implementation here, e.g. with redis
    options: { cacheDir: process.cwd() + '/temp' }, // options will be passed to the constructor of `adapter` class
  },

  // default values:
  migrations: {
    tableName: 'app_migrations', // name of database table with log of executed transactions
    path: 'src/data-access/migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: false, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode,
  },
};

/**
 * Initialize Mikro-ORM database settings
 */
async function initializeDatabase() {
  return await MikroORM.init({ ...options });
}

const config = initializeDatabase();

// Needed by MikroORM CLI
export default Promise.resolve({ ...options });

export { config };
