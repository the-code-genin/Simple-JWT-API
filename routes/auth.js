const UserModel = require('../models/user');
const UserAuthTokenModel = require('../models/user_auth_token');
const Validator = require('validatorjs');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const AuthMiddleware = require('../middleware/auth');
const AuthenticationError = require('../lib/errors').AuthenticationError;


const LoginValidator = (req, res, next) => {
    let rules = {
        email: 'required|email',
        password: 'required|min:6'
    };

    let messages = {
        'email.required': 'Email address is required',
        'email.email': 'A valid email address is required',
        'password.required': 'Password is required',
        'password.min': 'Password must be at least 6 characters long'
    };

    let validation = new Validator(req.body, rules, messages);

    if (validation.fails()) {
        res.json({
            success: false,
            error: {
                code: 401,
                type: 'InvalidFormData',
                message: validation.errors.first(Object.keys(validation.errors.all())[0])
            }
        });
        return;
    }

    next();
};

const SignupValidator = async (req, res, next) => {
    let rules = {
        email: 'required|email',
        password: 'required|min:6'
    };

    let messages = {
        'email.required': 'Email address is required',
        'email.email': 'A valid email address is required',
        'password.required': 'Password is required',
        'password.min': 'Password must be at least 6 characters long'
    };

    let validation = new Validator(req.body, rules, messages);

    if (validation.fails()) {
        res.json({
            success: false,
            error: {
                code: 401,
                type: 'InvalidFormData',
                message: validation.errors.first(Object.keys(validation.errors.all())[0])
            }
        });
        return;
    }

    try {
        let count = await UserModel.where('email', req.body.email).count();
        if (count != 0) {
            res.json({
                success: false,
                error: {
                    code: 401,
                    type: 'InvalidFormData',
                    message: 'This email is not available.'
                }
            });
            return;
        }
        
        next();
    } catch(e) {
        res.json({
            success: false,
            error: {
                code: 500,
                type: 'ServerError',
                message: e.message
            }
        });
    }
};


module.exports = (app) => {
    // Login route
    app.post('/api/v1/auth/login', LoginValidator, async (req, res) => {
        try {
            let user = await UserModel.where('email', req.body.email).fetch();
            if (user == null) throw new Error("Email and password combination do not match a user in our system.");
            if (!bcrypt.compareSync(req.body.password, user.toJSON({visibility: false}).password)) throw new Error("Email and password combination do not match a user in our system.");

            res.json({
                success: true,
                payload: {
                    data: user.toJSON(),
                    access_token: jwt.generateAccessToken(user),
                    token_type: 'bearer',
                    expires_in: process.env.JWT_TTI
                }
            });
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
    });

    // Signup route
    app.post('/api/v1/auth/signup', SignupValidator, async (req, res) => {
        try {
            let user = await (new UserModel({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            })).save();

            res.json({
                success: true,
                payload: {
                    data: user.toJSON(),
                    access_token: jwt.generateAccessToken(user),
                    token_type: 'bearer',
                    expires_in: process.env.JWT_TTI
                }
            });
        } catch(e) {
            res.json({
                success: false,
                error: {
                    code: 500,
                    type: 'ServerError',
                    message: e.message
                }
            });
        }
    });

    // Index route
    app.get('/api/v1/auth', AuthMiddleware, async (req, res) => {
        res.json({
            success: true,
            payload: {
                data: req.user
            }
        });
    });

    // Logout route
    app.post('/api/v1/auth/logout', AuthMiddleware, async (req, res) => {
        try {
            let token = /^Bearer (.+)$/i.exec(req.get('Authorization'))[1].trim();

            // Add token to list of invalidated tokens.
            let user = await UserModel.findOne({_id: req.user._id}).select('auth_tokens').exec();
            user.auth_tokens.push(token);
            await user.save();

            res.json({
                success: true,
                payload: {
                    data: {}
                }
            });
        } catch(e) {
            res.json({
                success: false,
                error: {
                    code: 500,
                    type: 'ServerError',
                    message: e.message
                }
            });
        }
    });

    // Refresh route
    app.post('/api/v1/auth/refresh', async (req, res) => {
        let header = req.get('Authorization');

        if (!/^Bearer (.+)$/i.test(header)) { // If bearer token is not present.
            res.json(AuthenticationError);
            return;
        }

        // Extract user id from bearer token
        let token = /^Bearer (.+)$/i.exec(header)[1].trim();
        let id = jwt.verifyExpiredAccessToken(token);

        if (!id) { // Invalid bearer token.
            res.json(AuthenticationError);
            return;
        }

        try {
            let user = await UserModel.where('id', id).fetch();
            if (user == null) throw new Error('User is not Authenticated');

            // Invalidate the previous auth token.
            await (new UserAuthTokenModel({token, user_id: user.id})).save();

            // Generate and return new auth token.
            res.json({
                success: true,
                payload: {
                    access_token: jwt.generateAccessToken(user),
                    token_type: 'bearer',
                    expires_in: process.env.JWT_TTI
                }
            });
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
    });
};