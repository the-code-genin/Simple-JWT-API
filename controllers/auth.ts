import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { AuthenticationError, ServerError } from "../lib/errors";
import JWT from "../lib/jwt";
import { getUserByEmail, User, userToJSON } from "../models/users";

export default class AuthController {
    static async login(req: Request, res: Response) {
        let user: User | undefined;

        try {
            user = await getUserByEmail(req.body.email);
            if (user == null) {
                throw new Error("Email and password combination do not match a user in our system.");
            } else if (!await bcrypt.compare(req.body.password, String(user.password))) {
                throw new Error("Email and password combination do not match a user in our system.");
            }
        } catch (e) {
            return res.status(401).json(AuthenticationError((e as Error).message));
        }

        res.status(200).json({
            success: true,
            payload: {
                data: userToJSON(user),
                access_token: JWT.generateAccessToken(user),
                token_type: 'bearer'
            }
        });
    }

    static async signup(req: Request, res: Response) {
        // let user: User | undefined;

        // try {
        //     user = new User;
        //     user.email = req.body.email;
        //     user.password = await bcrypt.hash(req.body.password, 10);
        //     user = await user.save();
        // } catch (e) {
        //     res.status(500).json(ServerError((e as Error).message));
        //     return;
        // }

        // res.status(201).json({
        //     success: true,
        //     payload: {
        //         data: user.toJSON(),
        //         access_token: JWT.generateAccessToken(user),
        //         token_type: 'bearer'
        //     }
        // });
    }

    static async logout(req: Request, res: Response) {
        // const authUser = req.app.get('authUser') as User;

        // try {
        //     let matches = /^Bearer (.+)$/i.exec(String(req.get('Authorization'))) as RegExpExecArray;
        //     let token = matches[1].trim();


        //     // Add token to list of invalidated tokens.
        //     let userAuthToken = new UserAuthToken;
        //     userAuthToken.user_id = authUser.id;
        //     userAuthToken.token = token;
        //     await userAuthToken.save();
        // } catch (e) {
        //     res.status(500).json(ServerError((e as Error).message));
        //     return;
        // }

        // res.status(200).json({
        //     success: true,
        //     payload: {
        //         data: {}
        //     }
        // });
    }

    static async index(req: Request, res: Response) {
        // res.json({
        //     success: true,
        //     payload: {
        //         data: (req.app.get('authUser') as User).toJSON()
        //     }
        // });
    }
}