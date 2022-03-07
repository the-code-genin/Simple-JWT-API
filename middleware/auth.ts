import jwt from '../lib/jwt'
import { AuthenticationError } from '../lib/errors'
import { NextFunction, Request, Response } from 'express';
import { checkUserForAuthToken, getUserByID, User } from '../models/users';

export default async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    let header = req.get('Authorization') as string;
    if (!/^Bearer (.+)$/i.test(header)) { // Bearer token is not present
        return res.status(401).json(AuthenticationError('User is not Authenticated'));
    }


    // Extract user ID from bearer token
    let token = (/^Bearer (.+)$/i.exec(header) as string[])[1].trim();
    let id = jwt.verifyAccessToken(token);
    if (!id) { // Invalid Bearer token
        return res.status(401).json(AuthenticationError('User is not Authenticated'));
    }


    // Get the user
    let user: User | undefined;
    try {
        user = await getUserByID(id);
        if (user == null) {
            throw new Error('User is not Authenticated.');
        } else if (await checkUserForAuthToken(Number(user.id), token)) {
            throw new Error('Bad/Expired auth token.');
        }
    } catch (e) {
        return res.status(401).json(AuthenticationError((e as Error).message));
    }

    // Pass the user object to the request and execute subsequent requests
    req.app.set('authUser', user);
    next();
}