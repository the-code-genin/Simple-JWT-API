import jwt from 'jsonwebtoken'
import { User } from '../models/user';

module.exports = {
    /**
     * Extract user id from a valid access token.
     */
    verifyAccessToken(token: string): string|null {
        try {
            let payload = jwt.verify(token, String(process.env.JWT_SECRET)) as {[key: string]: string};
            return payload.sub;
        } catch(e) {
            return null;
        }
    },

    /**
     * Extract user id from a valid or expired access token.
     */
    verifyExpiredAccessToken(token: string): string|null {
        try {
            let payload = jwt.verify(token, String(process.env.JWT_SECRET)) as {[key: string]: string};
            return payload.sub;
        } catch(e) {
            if (e instanceof jwt.TokenExpiredError) {
                let payload = jwt.decode(token) as {[key: string]: string};
                return payload.sub;
            } else return null;
        }
    },

    /**
     * Generate access token from a user instance
     */
    generateAccessToken(user: User): string {
        return jwt.sign({
            iss: process.env.APP_URL,
            exp: (new Date).getTime() + Number(process.env.JWT_TTI),
            sub: user.id
        }, String(process.env.JWT_SECRET));
    }
}