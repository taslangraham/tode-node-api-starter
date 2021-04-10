import { Application, Request, Response, Router } from "express";

module.exports = (app: Application, router: Router) => {

    /**
     * Create a new Item
     */
    router.post("/", (req, res) => {
        res.send("Example route - POST");
    });

    /**
     * Get all Items
     */
    router.get("/", (req: Request, res: Response) => {
        res.send("Example route - GET");
    });

    /**
     * Get an Item by Id
     */
    router.get("/:id", (req: Request, res: Response) => {
        res.send("Example route - GET /id");

    });

    /**
     * Update an Item
     */
    router.patch("/:id", (req: Request, res: Response) => {
        res.send("Example route - PATCH /id");

    });

    return router;
}
