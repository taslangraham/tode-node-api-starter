import { Application, Request, RequestHandler, Response } from "express";
import { app as expressApp } from '../app'

const NO_INSTANCES = 0;
const ACTIVE_INSTANCE = 1;

abstract class AppRouter {
	private static app = expressApp;
	private static instanceCount: number;

	public static get(path: string, controller: RequestHandler | string) {
		const isControllerString = typeof controller === 'string';
		const isControllerFunction = typeof controller === 'function';

		if (isControllerString) {
			const [controllerFileName, functionName] = (controller as string).split('.');
			const controllerPath = `../controllers/${controllerFileName}`;

			this.app.get(path, require(controllerPath)[functionName]);
		} else if (isControllerFunction) {
			this.app.get(path, controller as RequestHandler);
		} else {
			throw new Error('Route must be given a controller name or Function')
		}
	}


	public static post(path: string, controller: string | CallableFunction) { }
	public static delete(path: string, controller: string | CallableFunction) { }
	public static patch(path: string, controller: string | CallableFunction) { }


	public static registerAppInstance(app: Application) {
		if (this.instanceCount === NO_INSTANCES || !this.instanceCount) {
			this.app = app;
			this.instanceCount = ACTIVE_INSTANCE;
		} else {
			this.app = this.app;
		}
	}
}

export {
	AppRouter as Route
}

