import { NextFunction } from "express"
import { Request, Response } from '../config/core'

export default class Example{
  public handler(request: Request, response: Response, next: NextFunction) {
    console.log("Example middleware");
    next();
  }
}