import express, { Application } from "express";
import fs from "fs";

/**
 * Loads in all routes defined in controllers folder
 * @param app - Express Application instance
 */
const routes = (app: Application) => {
    const directories = fs.readdirSync(`${__dirname}`, { withFileTypes: true });

    for (const directory of directories) {
        if (directory.isDirectory()) {
            const router = express.Router();
            app.use(`/${directory.name}`, require(`./${directory.name}`)(app, router));
        }
    }
};

export { routes as loadRoutes };
