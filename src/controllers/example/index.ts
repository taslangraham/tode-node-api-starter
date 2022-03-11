import { exampleService } from "../../services/example";
import { Request, Response } from "../../config/core";

export function index(request: Request, response: Response) {
  response.send("/example");
}

export async function store(request: Request, response: Response) {
    // This can be easily updated to accept a body as part of the request
    // Then use the details passed in the body to create the new Item
    // Values were hardcoded for demonstration purposes
    try {
      const { success, data } = await exampleService.save("Harry Potter");

      return response.status(201).send(data);

    } catch (error) {
      console.log(error);
      return response.status(500).send("Internal Server Error");
    }
}

export function show(request: Request, response: Response) {
  return response.json(request.Auth)
}

export function edit(request: Request, response: Response) {}

export function update(request: Request, response: Response) { }

export function destroy(request: Request, response: Response) {}

