import { Request, Response, Router } from "express";
import {ServiceReponse } from "../../config/constants";
import { isLoggedIn } from "../../middlewares/auth";
import { User } from "../../models/user";
import { AuthErrorCode, GeneralErrorCode } from "../../modules/constants";
import { UserInfo } from "../../modules/entity/auth";
import { authService, LoginInfo } from '../../services/auth';
import { UserCreationInfo, userService } from '../../services/user';

/**
 * This file contains a simple implementation of JWT based authentication
 * Feel free to modify logic/validations to match your needs
 */
module.exports = () => {
  const router = Router();
  /**
   * Registers a new User
   */
  router.post("/register", async (req: Request, res: Response) => {
    let result: ServiceReponse<{
      user: UserInfo;
      token?: string;
      refreshToken?: string;
    }>;
    let statusCode = 200;
    try {
      // TODO
      // check if all fields exist on request body and that their data type is correct
      const userInfo: UserCreationInfo = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const data = await userService.createUser(userInfo);
      const createdUser = data.data as User;

      if (data.success && createdUser !== undefined) {
        // create JWT
        const token = authService.createTokenFromUser(createdUser);
        const refreshToken = authService.createTokenFromUser(createdUser);
        // const refreshResult = authService.storeToken(refreshToken, createdUser.$id());
        result = {
          success: true,
          data: { user: createdUser, token, refreshToken },
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

    return res.status(statusCode).send(result);
  });

  /**
   * login
   */
  router.post("/login", async (req: Request, res: Response) => {
    try {
      const loginInfo: LoginInfo = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      if (!loginInfo?.email || !loginInfo?.password) {
        return res.status(400).send({ message: 'Missing required fields' });
      }

      const { data: user, success } = await authService.login(loginInfo);

      if (!success) {
        return res.status(500).send({
          auth: false,
          message: 'Internal server error',
        });
      }

      if (user === null || user === undefined) {
        return res.status(401).send({
          auth: false,
          message: 'Invalid credential',
        });
      }

      // create JWT
      const token = authService.createTokenFromUser(user);

      return res.status(200).send({ auth: true, token });
    } catch (error) {
      return res.status(500).send({
        auth: false,
        message: 'Internal server error',
      });
    }
  });

  /**
   * Get User
   * This is a simple example of using the 'isLoggedIn' middleware to enforce
   * authentication on individual routes
   */
  router.get('/user', isLoggedIn, async (req: Request, res: Response) => {
    // Request will only hit here if request has a valid token
    // The 'isLoggedIn' middleware attatches a _user property to the body of the request
    const user = req.body._user;

    // The following will be returned if the user is Authenticated
    return res.status(200).send({ user, message: 'Authenticated' });
  });

  return router;
};
