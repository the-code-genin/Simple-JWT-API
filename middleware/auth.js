const jwt = require('../lib/jwt');
const UserModel = require('../models/user');
const AuthenticationError = require('../lib/errors').AuthenticationError;

module.exports = async (req, res, next) => {
    let header = req.get('Authorization');

    if (!/^Bearer (.+)$/i.test(header)) { // Bearer token is not present
        res.json(AuthenticationError);
        return;
    }

    // Extract user ID from bearer token
    let token = /^Bearer (.+)$/i.exec(header)[1].trim();
    let id = jwt.verifyAccessToken(token);

    if (!id) { // Invalid Bearer token
        res.json(AuthenticationError);
        return;
    }

    try {
        let user = await UserModel.where('id', id).fetch();

        if (user == null) throw new Error('User is not Authenticated');
        else if (await user.related('authTokens').where('token', token).count() != 0) throw new Error('User is not Authenticated');

        req.user = user;
        next();
    } catch(e) {
        res.json({
            success: false,
            error: {
                code: 401,
                type: 'AuthenticationError',
                message: e.message
            }
        });
    }
}