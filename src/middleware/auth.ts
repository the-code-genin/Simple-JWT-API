import jwt from "../helpers/jwt";
import { BadRequestError } from "../responses";
import { NextFunction, Request, Response } from "express";
import Users, { User } from "../database/users";

export default async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.get("Authorization") as string;
    if (!/^Bearer (.+)$/i.test(header)) { // Bearer token is not present
        return BadRequestError(res, "Bad token.");
    }

    // Extract user ID from bearer token
    const token = (/^Bearer (.+)$/i.exec(header) as string[])[1].trim();
    const id = jwt.verifyAccessToken(token);
    if (!id) { // Invalid Bearer token
        return BadRequestError(res, "Bad/Expired token.");
    }

    // Get the user
    let user: User | undefined;
    try {
        user = await Users.getUserByID(Number(id));
        if (user == null) {
            throw new Error("User is not Authenticated.");
        } else if (await Users.checkUserHasAuthToken(user.id, token)) {
            throw new Error("Expired auth token.");
        }
    } catch (e) {
        return BadRequestError(res, (e as Error).message);
    }

    // Pass the user object to the request and execute subsequent requests
    req.app.set("authUser", user);
    next();
}