import jwt from 'jsonwebtoken'
import User from '../models/user';

export interface JWTData {
    iss: string,
    sub: number
};

export default class JWT {
    /**
     * Extract user id from a valid access token.
     */
    static verifyAccessToken(token: string): number | null {
        try {
            let payload = jwt.verify(token, String(process.env.APP_KEY)) as JWTData;
            return payload.sub;
        } catch (e) {
            return null;
        }
    }

    /**
     * Generate access token from a user instance
     */
    static generateAccessToken(user: User): string {
        let data: JWTData = {
            iss: String(process.env.APP_URL),
            sub: user.id
        };

        return jwt.sign(data, String(process.env.APP_KEY));
    }
}