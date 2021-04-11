import express, { Request, Response } from "express";
import { MikroORM, RequestContext } from "mikro-orm";
import { loadBodyParser } from "./config";
import { initializeDatabase } from "./config/database";
import { loadRoutes } from "./controllers";

const app = express();
let database: MikroORM;

try {
    (async () => {

        // Load configuration settings for Database
        // You can define the values in env.ts
        database = await initializeDatabase();

        // Loads applications's body parser configurations
        loadBodyParser(app);

        // Add Mikro-Orm context to each request
        app.use((req, res, next) => { RequestContext.create(database.em, next); });

        // Loads in routes
        loadRoutes(app);

        app.get("/", async (req: Request, res: Response) => {
            return res.status(200).send("Powered by Tode - a Nodejs Scaffolding told");
        });

    })();
} catch (error) {
    throw new Error(error);
}

export {
    app,
    database as ORM,
};
