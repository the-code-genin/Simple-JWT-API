import jwt from 'jsonwebtoken'

module.exports = {
    /**
     * Extract user id from a valid access token.
     * @param {String} token
     * @returns {String}
     */
    verifyAccessToken(token: string): string|null {
        try {
            let payload = jwt.verify(token, String(process.env.JWT_SECRET)) as any;
            return payload.sub as string;
        } catch(e) {
            return null;
        }
    },

    /**
     * Extract user id from a valid or expired access token.
     * @param {String} token
     * @returns {String}
     */
    verifyExpiredAccessToken(token: string): string|null {
        try {
            let payload = jwt.verify(token, String(process.env.JWT_SECRET)) as any;
            return payload.sub as string;
        } catch(e) {
            if (e instanceof jwt.TokenExpiredError) {
                let payload = jwt.decode(token) as any;
                return payload.sub as string;
            } else return null;
        }
    },

    /**
     * 
     * @param {object} user
     * @returns {String}
     */
    generateAccessToken(user: any): string {
        return jwt.sign({
            iss: process.env.APP_URL,
            exp: (new Date).getTime() + Number(process.env.JWT_TTI),
            sub: user.id
        }, String(process.env.JWT_SECRET));
    }
}