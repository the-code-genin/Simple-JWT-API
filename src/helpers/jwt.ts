import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../database/users";

export default class JWT {
    static verifyAccessToken(token: string): string | null {
        try {
            const payload = jwt.verify(token, config.app.key) as JwtPayload;
            return payload.sub ?? null;
        } catch (e) {
            return null;
        }
    }

    static generateAccessToken(user: User): string {
        return jwt.sign({
            sub: user.id
        }, config.app.key);
    }
}