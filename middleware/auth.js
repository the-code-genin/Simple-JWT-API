const jwt = require('../lib/jwt');
const UserModel = require('../models/user');

module.exports = function(req, res, next) {
    let header = req.get('Authorization');

    if (!/^Bearer (.+)$/i.test(header)) {
        res.json({
            success: false,
            error: {
                code: 401,
                type: 'AuthenticationError',
                message: 'User is not Authenticated'
            }
        });
    } else {
        let token = /^Bearer (.+)$/i.exec(header)[1].trim();
        let id = jwt.verifyAccessToken(token);

        if (!id) {
            res.json({
                success: false,
                error: {
                    code: 401,
                    type: 'AuthenticationError',
                    message: 'User is not Authenticated'
                }
            });
        } else {
            UserModel.findOne({_id: id, auth_tokens: {$ne: token}}).select('-password -auth_tokens').exec().then(user => {
                if (user == null) {
                    throw new Error('User is not Authenticated');
                } else {
                    req.user = user;
                    next();
                }
            }).catch(e => {
                res.json({
                    success: false,
                    error: {
                        code: 401,
                        type: 'AuthenticationError',
                        message: e.message
                    }
                });
            });
        }
    }
}