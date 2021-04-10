import express, { Request, Response } from "express";
import { loadBodyParser } from "./config";
import { loadRoutes } from "./controllers";

const app = express();

// Loads applications's body parser configurations
loadBodyParser(app);

// Loads in routes
loadRoutes(app);

app.get("/", (req: Request, res: Response) => {
    res.send("Powered by Tode - a node project scafolding tool");
});

export {
    app,
};
