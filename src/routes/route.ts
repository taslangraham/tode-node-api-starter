import { Route } from '../config/appRouter';
import { Request, Response } from "express";

Route.get('/users', 'testController.view');

Route.get('/test/:id', (request: Request, response: Response) => {
	response.send({ message: "Hello world " + request.params.id })
});