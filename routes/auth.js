const UserModel = require('../models/user');
const Validator = require('validatorjs');
const bcrypt = require('bcrypt');

const SignupValidator = function(req, res, next) {
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
    } else {
        UserModel.findOne({email: req.body.email}).exec().then(user => {
            if (user != null) {
                res.json({
                    success: false,
                    error: {
                        code: 401,
                        type: 'InvalidFormData',
                        message: 'This email is not available.'
                    }
                });
            } else next();
        });
    }
};

module.exports = function(app) {
    app.post('/api/v1/auth/signup', SignupValidator, function(req, res){
        UserModel.create({
            email: req.body.email, 
            password: bcrypt.hashSync(req.body.password, 10)
        }).then(user => {
            res.json({
                success: true,
                payload: {
                    data: user.toJSON()
                }
            });
        }).catch(e => {
            throw new Error(e.message);
        });
    });
};