import { MikroORM, ReflectMetadataProvider } from '@mikro-orm/core';
import { env } from "../env";
const { database } = env;

/**
 * Initialize Mikro-ORM database settings
 */
async function initializeDatabase() {
  // Visit https://mikro-orm.io/docs/installation for more details
  return await MikroORM.init({
    forceEntityConstructor: false,
    discovery: { warnWhenNoEntities: false },
    metadataProvider: ReflectMetadataProvider,
    // points to compiled js files,
    entities: ['./dist/src/models/index.entity.js'],
    // path to your TS entities (source), relative to `baseDir`
    entitiesTs: ['./src/models/index.entity.ts'],
    ...database,
  });
}

export { initializeDatabase };
