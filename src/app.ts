import express, { Application, Request, Response } from "express";
import { configureCors, loadBodyParser } from "./config";
import { Route } from "./config/appRouter";
import { initializeDatabase } from './config/database/db-config';
import { routeTable } from "./config/route-table";
import { loadRoutes } from "./controllers/index";
class App {
  private _app: Application;
  private PORT = process.env.PORT || 8080;

  constructor() {
    this._app = express();
  }

  public initiatlize() {
    try {
      configureCors(this._app);
      loadBodyParser(this._app);
      initializeDatabase();
      this.registerBaseRoute();
      Route.registerAppInstance(this._app);
      require('./routes/route')
      // loadRoutes(this._app);
      this.addListener();

    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  /**
   * Add the base route, '/', to the route table
   */
  private addBaseRouteToRouteTable() {
    // register the entry route above
    routeTable.register(this._app._router.stack
      .filter((s: { route: any; }) => s.route)
      .map((r: any) => ({
        name: '/',
        path: r.route.path,
        method: Object.keys(r.route.methods)[0],
      })));
  }

  /**
   * Registers the base route, '/'
   */
  private registerBaseRoute() {
    this._app.get("/", async (req: Request, res: Response) => {
      return res.status(200).send({
        message: `Powered by Tode - a Nodejs Scaffolding told.
      Below is a list of your Application's endpoints.
      Nested routes are currently not shown.`,
        endpoints: routeTable.routes,
      });
    });
  }


  public get app() {
    return this._app;
  }
  /**
   * Adds listener for the app
   */
  private addListener() {
    const PORT = this.PORT;
    this._app.listen(PORT, () => {
      console.log("Your app is running on " + PORT);
    });
  }
}

const app = new App();
app.initiatlize();
const expressApp = app.app;

export {
  expressApp as app,
}
