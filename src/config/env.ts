// Import Driver to be used
import { MongoDriver } from "@mikro-orm/mongodb";
import { Options } from "mikro-orm";

// Configuration properties for database
const database: Options = {
    driver: MongoDriver,
    dbName: 'apple-store',
    type: "mongo", // mongo || mariadb || mysql || postgresql || sqlite
    clientUrl: 'mongodb://localhost:27017',
};

export const env = {
    database,
};
