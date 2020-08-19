const jwt = require('jsonwebtoken');

module.exports = {
    verifyAccessToken(header) {
        if (!/^Bearer (.+)$/i.test(header)) return null;
        let token = /^Bearer (.+)$/i.exec(header)[1];

        try {
            let payload = jwt.verify(token.trim(), process.env.JWT_SECRET);
            return payload.sub;
        } catch(e) {
            console.log(e);
            return null;
        }
    },

    generateAccessToken(user) {
        return jwt.sign({
            iss: process.env.APP_URL,
            exp: Date.now + 3600,
            sub: user._id
        }, process.env.JWT_SECRET)
    }
}