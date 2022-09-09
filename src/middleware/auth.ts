import jwt from '../helpers/jwt'
import { AuthenticationError } from '../responses'
import { NextFunction, Request, Response } from 'express';
import Users, { User } from '../database/users';

export default async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    let header = req.get('Authorization') as string;
    if (!/^Bearer (.+)$/i.test(header)) { // Bearer token is not present
        return AuthenticationError(res, "Bad token.");
    }

    // Extract user ID from bearer token
    let token = (/^Bearer (.+)$/i.exec(header) as string[])[1].trim();
    let id = jwt.verifyAccessToken(token);
    if (!id) { // Invalid Bearer token
        return AuthenticationError(res, "Bad/Expired token.");
    }

    // Get the user
    let user: User | undefined;
    try {
        user = await Users.getUserByID(id);
        if (user == null) {
            throw new Error('User is not Authenticated.');
        } else if (await Users.checkUserHasAuthToken(user.id, token)) {
            throw new Error('Expired auth token.');
        }
    } catch (e) {
        return AuthenticationError(res, (e as Error).message);
    }

    // Pass the user object to the request and execute subsequent requests
    req.app.set('authUser', user);
    next();
}