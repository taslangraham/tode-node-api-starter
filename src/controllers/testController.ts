import { Application, Request, RequestHandler, Response } from "express";

export function view(request: Request, response: Response){
	return response.send([
		{
			id: 1,
			name:' User 1'
		},
		{
			id: 2,
			name:' User 1'
		}
	])
}