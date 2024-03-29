import Knex from 'knex';
import { Model } from 'objection';
import { env } from '../../../env';

const DATABASE = env.database;
const connection = {
  client: DATABASE.client,
  connection: {
    database: DATABASE.name,
    user: DATABASE.user,
    password: DATABASE.password,
    port: DATABASE.port,
    client:DATABASE.host,
  },
  seeds: DATABASE.seeds,
  migrations: DATABASE.migrations,
};

function initializeDatabase() {

  // Initialize knex.
  // Bind all Models to a knex instance.
  if (env.database.isEnabled) {
    const knex = Knex(connection);
    Model.knex(knex);
  }
}
export { initializeDatabase, connection };
