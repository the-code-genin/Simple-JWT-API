const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * Extract user id from a valid access token.
     * @param {String} token
     * @returns {String}
     */
    verifyAccessToken(token) {
        try {
            let payload = jwt.verify(token, process.env.JWT_SECRET);
            return payload.sub;
        } catch(e) {
            return null;
        }
    },

    /**
     * Extract user id from a valid or expired access token.
     * @param {String} token
     * @returns {String}
     */
    verifyExpiredAccessToken(token) {
        try {
            let payload = jwt.verify(token, process.env.JWT_SECRET);
            return payload.sub;
        } catch(e) {
            if (e instanceof jwt.TokenExpiredError) {
                let payload = jwt.decode(token);
                return payload.sub;
            } else return null;
        }
    },

    /**
     * 
     * @param {object} user
     * @returns {String}
     */
    generateAccessToken(user) {
        return jwt.sign({
            iss: process.env.APP_URL,
            exp: (new Date).getTime() + Number(process.env.JWT_TTI),
            sub: user._id
        }, process.env.JWT_SECRET)
    }
}