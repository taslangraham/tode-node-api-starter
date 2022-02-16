import { NextFunction } from "express"
import { Request, Response } from '../config/core'

export default class Example{
	public handler(req: Request, res: Response, next: NextFunction) {
		console.log("Example middleware");
		next();
	}
}