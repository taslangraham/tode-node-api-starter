/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file can be enough for your project,
  however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── routes/cart.ts
| ├── routes/customer.ts
|
| and then import them inside `routes/index.ts` as follows
|
| import './cart'
|
*/

import {
  App,
  loadController,
  Response, Request,
  withMiddleware
} from '../config/core';

App.get("/", async (request: Request, response: Response) => {
  return response.status(200)
    .send(`Powered by Tode - a Nodejs Scaffolding tool.`);
});

App.get('/example', loadController('example.index'));