import { Router } from "express";
import fs from "fs";
import { app } from "../app";

import { routeTable } from "../config/route-table";
/**
 * Loads in all routes defined in controllers folder
 */
const routes = () => {
  const directories = fs.readdirSync(`${__dirname}`, { withFileTypes: true });
  for (const directory of directories) {
    if (directory.isDirectory()) {

      const routeDef: Router = require(`./${directory.name}`)();
      app.use(`/${directory.name}`, routeDef);

      const transformed = routeDef.stack.map((s) => ({
        name: directory.name,
        path: '/' + directory.name + s.route.path,
        method: Object.keys(s.route.methods)[0]
      }));

      routeTable.register(transformed);
    }
  }
};

export {
  routes as loadRoutes,
};
