import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { AuthenticationError, ServerError } from "../lib/errors";
import JWT from "../lib/jwt";
import User from "../models/user";
import UserAuthToken from "../models/user_auth_token";

export default class AuthController {
    /**
     * Generate JWT token for a user upon successful credential validation
     */
    static async login(req: Request, res: Response) {
        try {
            let user = await User.findOne({where: {email: req.body.email}});
            if (user == null) throw new Error("Email and password combination do not match a user in our system.");
            if (!await bcrypt.compare(req.body.password, user.password)) throw new Error("Email and password combination do not match a user in our system.");
    
            res.json({
                success: true,
                payload: {
                    data: user.toJSON(),
                    access_token: JWT.generateAccessToken(user),
                    token_type: 'bearer',
                    expires_in: process.env.JWT_TTI
                }
            });
        } catch(e) {
            res.json(AuthenticationError((e as Error).message));
        }
    }

    /**
     * Sign a user up and generate the initial JWT auth token
     */
    static async signup(req: Request, res: Response) {
        let user = new User;
        user.email = req.body.email;
        user.password = await bcrypt.hash(req.body.password, 10);
        user = await user.save();

        res.json({
            success: true,
            payload: {
                data: user.toJSON(),
                access_token: JWT.generateAccessToken(user),
                token_type: 'bearer',
                expires_in: process.env.JWT_TTI
            }
        });
    }

    /**
     * Invalidate a user's auth token
     */
    static async logout(req: Request, res: Response) {
        try {
            let matches = /^Bearer (.+)$/i.exec(req.get('Authorization') as string) as RegExpExecArray;
            let token = matches[1].trim();


            // Add token to list of invalidated tokens.
            let userAuthToken = new UserAuthToken;
            userAuthToken.user = Promise.resolve(req.app.get('authUser') as User);
            userAuthToken.token = token;
            await userAuthToken.save();

            res.json({
                success: true,
                payload: {
                    data: {}
                }
            });
        } catch(e) {
            res.json(ServerError((e as Error).message));
        }
    }

    /**
     * Request a user object
     */
    static async index(req: Request, res: Response) {
        res.json({
            success: true,
            payload: {
                data: (req.app.get('authUser') as User).toJSON()
            }
        });
    }

    /**
     * Refresh a user's JWT auth token and invalidate the previous token.
     */
    static async refresh(req: Request, res: Response) {
        let header = req.get('Authorization') as string;
        if (!/^Bearer (.+)$/i.test(header)) { // If bearer token is not present.
            res.json(AuthenticationError('User is not Authenticated'));
            return;
        }


        // Extract user id from bearer token
        let matches = /^Bearer (.+)$/i.exec(header) as RegExpExecArray;
        let token = matches[1].trim();
        let id = JWT.verifyExpiredAccessToken(token);
        if (!id) { // Invalid bearer token.
            res.json(AuthenticationError('User is not Authenticated'));
            return;
        }


        try {
            let user = await User.findOne({where: {id}});
            if (user == null) throw new Error('User is not Authenticated');


            // Invalidate the previous auth token.
            let userAuthToken = new UserAuthToken;
            userAuthToken.user = Promise.resolve(req.app.get('authUser') as User);
            userAuthToken.token = token;
            await userAuthToken.save();


            // Generate and return new auth token.
            res.json({
                success: true,
                payload: {
                    access_token: JWT.generateAccessToken(user),
                    token_type: 'bearer',
                    expires_in: process.env.JWT_TTI
                }
            });
        } catch(e) {
            res.json(AuthenticationError((e as Error).message));
        }
    }
}