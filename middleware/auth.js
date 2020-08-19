const jwt = require('../lib/jwt');
const UserModel = require('../models/user');

module.exports = function(req, res, next) {
    let id = jwt.verifyAccessToken(req.get('Authorization'));
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
        UserModel.findOne({_id: id}).exec().then(user => {
            if (user == null) {
                res.json({
                    success: false,
                    error: {
                        code: 401,
                        type: 'AuthenticationError',
                        message: 'User is not Authenticated'
                    }
                });
            } else {
                req.user = user;
                next();
            }
        });
    }
}