/**
 * This file contains a simple implementation of JWT based authentication
 * Feel free to modify logic/validations to match your needs
 */

 import { ServiceReponse } from "../../config/constants";
 import { User } from "../../models/user";
 import { AuthErrorCode, GeneralErrorCode } from "../../modules/constants";
 import { UserInfo } from "../../modules/entity/auth";
 import { authService, LoginInfo } from '../../services/auth';
 import { UserCreationInfo, userService } from '../../services/user';
 import { Request, Response } from "../../config/core";


 export function index(request: Request, response: Response) {
   // Request will only hit here if request has a valid token
   // The 'isLoggedIn' middleware attatches a _user property to the body of the request
   const user = request.body._user;

   // The following will be returned if the user is Authenticated
   return response.status(200).send(user);
 }

 export async function store(request: Request, response: Response) {
   {
     let result: ServiceReponse<{ user: UserInfo; token?: string; refreshToken?: string; }>;
     let statusCode = 200;

     try {
       // check if all fields exist on request body and that their data type is correct
       const userInfo: UserCreationInfo = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
       const data = await userService.createUser(userInfo);
       const createdUser = data.data as User;

       if (data.success && createdUser !== undefined) {
         // create JWT
         const token = authService.createTokenFromUser(createdUser);
         result = {
           success: true,
           data: { user: createdUser, token, },
         };
       } else {
         switch (data.errorCode) {
           case AuthErrorCode.MISSING_REQUIRED_FILEDS:
             statusCode = 400;
             break;
           case AuthErrorCode.USER_ALREADY_EXISTS:
             statusCode = 400;
             break;
           default:
             statusCode = 409;
             break;
         }

         result = {
           success: false,
           errorCode: data.errorCode,
           errorMessage: data.errorMessage,
         };
       }
     } catch (error) {
       console.log('[Register Error ]:', error);
       result = {
         success: false,
         errorMessage: GeneralErrorCode.INTERNAL_SERVER_ERROR,
         errorCode: "Internal server error",
       };
     }

     return response.status(statusCode).send(result);
   }
 }

 export async function show(request: Request, response: Response) { }

 export async function edit(request: Request, response: Response) { }

 export async function update(request: Request, response: Response) { }

 export async function destroy(request: Request, response: Response) { }

 export async function login(request: Request, response: Response) {
   try {
     const loginInfo: LoginInfo = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;

     if (!loginInfo?.email || !loginInfo?.password) {
       return response.status(400).send({ message: 'Missing required fields' });
     }

     const { data: user, success } = await authService.login(loginInfo);

     if (!success) {
       return response.status(500).send({
         auth: false,
         message: 'Internal server error',
       });
     }

     if (user === null || user === undefined) {
       return response.status(401).send({
         auth: false,
         message: 'Invalid credential',
       });
     }

     // create JWT
     const token = authService.createTokenFromUser(user);

     return response.status(200).send({ auth: true, token });
   } catch (error) {
     return response.status(500).send({
       auth: false,
       message: 'Internal server error',
     });
   }
 }

