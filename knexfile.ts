// Update with your config settings.
export default {

  development: {
    client: "postgresql",
    connection: {
      database: "",
      user: "",
      password: "",
      port: "",
    },
    seeds: {
      directory: 'src\\data-access\\seeds'
    },
    migrations: {
      tableName: "knex_migrations",
      directory: 'src\\data-access\\migrations',
    },
  },

  production: {
    client: "",
    connection: {
      database: "",
      user: "",
      password: "",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "",
    },
  },

};
