import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AuthorizationError, ServerError, SuccessResponse } from "../responses";
import JWT from "../helpers/jwt";
import Users, { User } from "../database/users";

export default class AuthController {
    static async login(req: Request, res: Response) {
        let user: User | undefined;

        try {
            user = await Users.getUserByEmail(req.body.email);
            if (user == null) {
                throw new Error("Email and password combination do not match a user in our system.");
            } else if (!await bcrypt.compare(req.body.password, user.password)) {
                throw new Error("Email and password combination do not match a user in our system.");
            }
        } catch (e) {
            return AuthorizationError(res, (e as Error).message);
        }

        return SuccessResponse(res, {
            data: Users.toJSON(user),
            access_token: JWT.generateAccessToken(user),
            token_type: "bearer"
        });
    }

    static async signup(req: Request, res: Response) {
        let user: User | undefined;

        try {
            user = await Users.insert({
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            });
        } catch (e) {
            return ServerError(res, (e as Error).message);
        }

        return SuccessResponse(res, {
            data: Users.toJSON(user),
            access_token: JWT.generateAccessToken(user),
            token_type: "bearer"
        }, 201);
    }

    static async logout(req: Request, res: Response) {
        const authUser = req.app.get("authUser") as User;

        try {
            const matches = /^Bearer (.+)$/i.exec(String(req.get("Authorization"))) as RegExpExecArray;
            const token = matches[1].trim();
            await Users.addUserAuthToken(Number(authUser.id), token);
        } catch (e) {
            return ServerError(res, (e as Error).message);
        }

        return SuccessResponse(res, {});
    }

    static async getMe(req: Request, res: Response) {
        const user = req.app.get("authUser") as User;

        return SuccessResponse(res, {
            data: Users.toJSON(user)
        });
    }
}