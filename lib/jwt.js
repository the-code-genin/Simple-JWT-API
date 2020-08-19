const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * 
     * @param {String} token
     * @returns {String}
     */
    verifyAccessToken(token) {
        try {
            let payload = jwt.verify(token, process.env.JWT_SECRET);
            return payload.sub;
        } catch(e) {
            console.log(e);
            return null;
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
            exp: (new Date).getTime() + 3600,
            sub: user._id
        }, process.env.JWT_SECRET)
    }
}