import { MikroORM, RequestContext } from "@mikro-orm/core";
import express, { Request, Response } from "express";
import { initializeDatabase } from "./config/database";
import { routeTable } from "./config/route-table";
import { loadRoutes } from "./controllers";

const app = express();
let database: MikroORM;

try {
  (async () => {

    // Load configuration settings for Database
    // You can define the values in env.ts
    database = await initializeDatabase();

    // Add Mikro-Orm context to each request
    app.use((req, res, next) => { RequestContext.create(database.em, next); });

    app.get("/", async (req: Request, res: Response) => {
      return res.status(200).send({
        message: `Powered by Tode - a Nodejs Scaffolding told.\nBelow is a lost of your Application's endpoints`,
        endpoints: routeTable.routes,
      },
      );
    });

    // register the entry route above
    routeTable.register(app._router.stack
      .filter((s: { route: any; }) => s.route)
      .map((r: any) => ({
        name: '/',
        path: r.route.path,
        method: Object.keys(r.route.methods)[0],
      })));

    // Loads in user defined routes
    loadRoutes(app);
  })();
} catch (error) {
  throw new Error(error);
}

export {
  app,
  database as ORM,
};
