import { FileCacheAdapter, MikroORM, ReflectMetadataProvider, UnderscoreNamingStrategy } from '@mikro-orm/core';
import { env } from "../env";
const { database } = env;

/**
 * Initialize Mikro-ORM database settings
 */
async function initializeDatabase() {
  // Visit https://mikro-orm.io/docs/installation for more details
  return await MikroORM.init({
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
    ...database,
  });
}

export { initializeDatabase };
