import jwt, { JwtPayload } from 'jsonwebtoken';
import { hashCompare } from "../../../.tode/lib";
import { ORM } from "../../app";
import { ServiceReponse } from "../../config/constants";
import { env } from '../../config/env';
import { User } from '../../models/user';
const TOKEN_TIME_TO_LIVE = 86400; // 24 hours
const { JWT_SECRET } = env;

export interface LoginInfo {
	email: string;
	password: string;
}

interface JwtDecode extends JwtPayload {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

class Auth {

	constructor() {
		//
	}

	/**
	 * Creates a JSON web token
	 * @param user
	 * @returns
	 */
	public createTokenFromUser(user: User) {
		const body = {
			id: user && user?._id,
			firstName: user && user.firstName,
			email: user && user.email,
			lastName: user && user.lastName,
		};

		return jwt.sign(
			body,
			JWT_SECRET,
			{ expiresIn: TOKEN_TIME_TO_LIVE },
		);
	}

	/**
	 * Decodes a JSON web token
	 * @param token
	 * @returns
	 */
	public decodeToken(token: string) {
		return jwt.verify(token, JWT_SECRET, {
			// add additional options here
		}) as JwtDecode;
	}

	/**
	 * Validates a User's login credentials and return the User if found
	 * @param credentials
	 */
	public async login(credentials: LoginInfo) {
		let result: ServiceReponse<User> = { success: false };

		try {
			const user = await ORM.em.findOne(User, { email: credentials.email });

			if (user === null) {
				result = {
					success: false,
				};
			} else {
				const isCorrectPassword = await hashCompare(credentials.password, user.password);

				if (isCorrectPassword) {
					result = {
						success: true,
						data: user,
					};
				}

			}
		} catch (error) {
			console.log(error);
			throw new Error('Failed to login');
		}

		return result;
	}
}

const authService = new Auth();

export { authService };
