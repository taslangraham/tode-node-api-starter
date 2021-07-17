import { ORM } from "../../app";
import { ServiceReponse } from "../../config/constants";
import { stringHash } from "../../lib";
import { User } from '../../models/user';

export interface UserCreationInfo {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

class UserService {

  constructor() {
    //
  }

  public async findUserByEmail(email: string) {
    let result: ServiceReponse<User>;

    try {
      const user = await ORM.em.findOne(User, { email });
      result = {
        data: user,
        success: true,
      };
    } catch (error) {
      throw new Error(`[ Find By Email Error ]: ${error.message}`);
    }

    return result;
  }

  public async createUser(userInfo: UserCreationInfo) {
    let result: ServiceReponse<User>;
    try {
      const user = ORM.em.create(User, {
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        password: await stringHash(userInfo.password),
      });

      await ORM.em.persistAndFlush(user);

      result = {
        data: user,
        success: true,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create User');
    }

    return result;
  }
}

const userService = new UserService();

export { userService };
