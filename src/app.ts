import express, { Application, Request, Response } from "express";
import { configureCors, loadBodyParser } from "./config";
import { initializeDatabase } from './config/database/db-config';
import { routeTable } from "./config/route-table";
const app = express();
class Server {
  private defaultPort = 8088;
  private PORT = process.env.PORT || this.defaultPort;
  private app: Application = {} as Application;

  constructor(appInstance: Application) {
    this.app = appInstance;
  }

  public initiatlize() {
    try {
      configureCors(this.app);
      loadBodyParser(this.app);
      initializeDatabase();
      require('./routes')
      this.addListener();

    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
  }

  /**
   * Adds listener for the app
   */
  private addListener() {
    this.app.listen(this.PORT, () => {
      console.log("Your app is running on " + this.PORT);
    });
  }
}

const server = new Server(app);
server.initiatlize();

export { app }
