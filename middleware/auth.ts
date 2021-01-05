import jwt from '../lib/jwt'
import errors from '../lib/errors'
import User from '../models/user'
import { NextFunction, Request, Response } from 'express';
import UserAuthToken from '../models/user_auth_token';

let AuthenticationError = errors.AuthenticationError;

export default async (req: Request, res: Response, next: NextFunction) => {
    let header = req.get('Authorization') as string;
    if (!/^Bearer (.+)$/i.test(header)) { // Bearer token is not present
        res.json(AuthenticationError);
        return;
    }


    // Extract user ID from bearer token
    let token = (/^Bearer (.+)$/i.exec(header) as string[])[1].trim();
    let id = jwt.verifyAccessToken(token);
    if (!id) { // Invalid Bearer token
        res.json(AuthenticationError);
        return;
    }


    try {
        let user = await User.findOneOrFail({where: {id}});

        if (user == null) throw new Error('User is not Authenticated');
        else if (await UserAuthToken.count({where: {user_id: user.id, token}}) != 0) throw new Error('User is not Authenticated');

        req.app.set('user', user);
        next();
    } catch(e) {
        res.json({
            success: false,
            error: {
                code: 401,
                type: 'AuthenticationError',
                message: e.message
            }
        });
    }
}