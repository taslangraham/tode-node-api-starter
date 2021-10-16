import express, { Request, Response } from "express";
import { configureCors, loadBodyParser } from "./config";
import { initializeDatabase } from './config/database/db-config';
import { routeTable } from "./config/route-table";
import { loadRoutes } from "./controllers/index";
const app = express();
const PORT = process.env.PORT || 6767;

try {
  configureCors(app);
  loadBodyParser(app);
  initializeDatabase();

  app.get("/", async (req: Request, res: Response) => {
    return res.status(200).send({
      message: `Powered by Tode - a Nodejs Scaffolding told.\nBelow is a list of your Application's endpoints`,
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

  // Loads in user defined routes 1 level
  loadRoutes(app);

  app.listen(PORT, () => {
    console.log("Your app is running on " + PORT);
  });

} catch (error) {
  console.log(error);
  throw new Error(error as string);
}

export {
  app,
};
