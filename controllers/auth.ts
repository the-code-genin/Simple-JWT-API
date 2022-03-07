import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { AuthenticationError, ServerError } from "../lib/errors";
import JWT from "../lib/jwt";
import Users, { User } from "../models/users";
import SuccessResponse from "../lib/success-response";

export default class AuthController {
    static async login(req: Request, res: Response) {
        let user: User | undefined;

        try {
            user = await Users.getUserByEmail(req.body.email);
            if (user == null) {
                throw new Error("Email and password combination do not match a user in our system.");
            } else if (!await bcrypt.compare(req.body.password, String(user.password))) {
                throw new Error("Email and password combination do not match a user in our system.");
            }
        } catch (e) {
            return AuthenticationError(res, (e as Error).message);
        }

        return SuccessResponse(res, {
            data: Users.toJSON(user),
            access_token: JWT.generateAccessToken(user),
            token_type: 'bearer'
        });
    }

    static async signup(req: Request, res: Response) {
        let user: User = {};

        try {
            user.email = req.body.email;
            user.password = await bcrypt.hash(req.body.password, 10);
            user = await Users.save(user);
        } catch (e) {
            return ServerError(res, (e as Error).message);
        }

        return SuccessResponse(res, {
            data: Users.toJSON(user),
            access_token: JWT.generateAccessToken(user),
            token_type: 'bearer'
        }, 201);
    }

    static async logout(req: Request, res: Response) {
        const authUser = req.app.get('authUser') as User;

        try {
            let matches = /^Bearer (.+)$/i.exec(String(req.get('Authorization'))) as RegExpExecArray;
            let token = matches[1].trim();
            await Users.addUserAuthToken(Number(authUser.id), token);
        } catch (e) {
            return ServerError(res, (e as Error).message);
        }

        return SuccessResponse(res, {});
    }

    static async getMe(req: Request, res: Response) {
        const user = req.app.get('authUser') as User;

        return SuccessResponse(res, {
            data: Users.toJSON(user)
        });
    }
}