const jwt = require('jsonwebtoken');

module.exports = {
    verifyAccessToken(token) {
        try {
            let payload = jwt.verify(token, process.env.JWT_SECRET);
            return payload.sub;
        } catch(e) {
            return null;
        }
    },

    generateAccessToken(user) {
        let now = (new Date).getTime();
        return jwt.sign({
            iss: process.env.APP_URL,
            nbf: now,
            exp: now + 3600,
            sub: user._id
        }, process.env.JWT_SECRET)
    }
}