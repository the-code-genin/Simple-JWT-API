import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../database/users';

export default class JWT {
    static verifyAccessToken(token: string): number | null {
        try {
            let payload = jwt.verify(token, String(process.env.APP_KEY)) as JwtPayload;
            return Number(payload.sub);
        } catch (e) {
            return null;
        }
    }

    static generateAccessToken(user: User): string {
        let data: JwtPayload = {
            iss: String(process.env.APP_URL),
            sub: String(user.id)
        };

        return jwt.sign(data, String(process.env.APP_KEY));
    }
}