import { NextFunction, Request, Response } from 'express'
import Validator from 'validatorjs'
import User from '../models/user';
import {ConflictError, InvalidFormDataError} from '../lib/errors';

export default class AuthValidator {
    static async login(req: Request, res: Response, next: NextFunction) {
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
            res.status(400).json(InvalidFormDataError(validation.errors.first(Object.keys(validation.errors.all())[0]) as string));
            return;
        }
    
        next();
    }

    static async signup(req: Request, res: Response, next: NextFunction) {
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
            res.status(400).json(InvalidFormDataError(validation.errors.first(Object.keys(validation.errors.all())[0]) as string));
            return;
        }

        if (await User.count({where: {email: req.body.email}}) != 0) {
            res.status(409).json(ConflictError('This email is not available.'));
            return;
        }

        next();
    }
}