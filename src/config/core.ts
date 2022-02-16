import { Response as ExpressResponse, Request as ExpressRequest, NextFunction } from 'express';
import middleware  from "../middlewares";
import { app } from '../app'

export interface Response extends ExpressResponse { }
export interface Request extends ExpressRequest {
  Auth?: {
    id: string,
    email: string;
    firstName: string;
    lastName: string;
  }
}

/**
 * Accepts a string containing controller name and function. Searches for controller function, and returns it.
 * String format <ControllerFileName.Method>
 * @param name Period separated controller file name and method - <ControllerFileName.Method>
 * @returns
 */
function registerController(name: string) {
	if (typeof name !== 'string') {
		throw new Error('Controller parameter for route must be a string')
	}

	const [controllerFileName, functionName] = name.split('.');
	const controllerPath = `../controllers/${controllerFileName}`;

	return require(controllerPath)[functionName];
}


/**
 * Findds and return middleware methods based on names given
 * @param name
 * @returns
 */
function withMiddleware(name: string | string[]) {
	const middlewareNames = [...arguments];
	const middlewares: ((req: Request, res: Response, next: NextFunction) => void)[] = []

	for (name of middlewareNames) {
		const middlewareClass = middleware[name as keyof typeof middleware]
		const handler = new middlewareClass().handler
		middlewares.push(handler)
	}

	return middlewares;
}

enum HttpMethod{
	GET = 'get',
	POST = 'post',
	DELETE = 'delete',
	PATCH = 'patch',
	PUT = 'put',
}

export {
	app as App,
	registerController as loadController,
  withMiddleware,
  HttpMethod
}