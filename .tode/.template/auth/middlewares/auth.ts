import { authService } from '../services/auth';
import { NextFunction } from "express"
import { Request, Response } from '../config/core'

export default class Auth {
  public handler(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization && request.headers.authorization;
    try {

      if (!authToken) {
        return response
          .status(403)
          .send({ auth: false, message: 'Missing required Token' });
      }

      const decoded = authService.decodeToken(authToken);
      request.Auth = {
        id: decoded.id,
        email: decoded.email,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
      };

      return next();
    } catch (error) {
      console.log(`[ Auth middleware Error ]: ${error}`);
      return response
        .status(403)
        .send({ auth: false, message: JSON.stringify(error) });
    }
  }
}
