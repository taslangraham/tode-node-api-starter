import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../../knexfile';

function initializeDatabase() {
  // Initialize knex.
  // Bind all Models to a knex instance. If you only have one database in
  // your server this is all you have to do. For multi database systems, see
  const knex = Knex(knexConfig.development);
  Model.knex(knex);
}

export { initializeDatabase };
