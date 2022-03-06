import { NextFunction, Request, Response } from 'express'
import User from '../models/user';
import { ConflictError, InvalidFormDataError } from '../lib/errors';
import Joi from 'joi';

export default class AuthValidator {
    static async login(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            email: Joi.string().email().required(),

            password: Joi.string().min(6).required(),
        });
        const validationResult = schema.validate(req.body);

        if (validationResult.error) 
            return res.status(400).json(InvalidFormDataError(String(validationResult.error)));

        next();
    }

    static async signup(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            email: Joi.string().email().required(),

            password: Joi.string().min(6).required(),
        });
        const validationResult = schema.validate(req.body);

        if (validationResult.error) {
            return res.status(400).json(InvalidFormDataError(String(validationResult.error)));
        } else if (await User.count({ where: { email: req.body.email } }) != 0) {
            return res.status(409).json(ConflictError('This email is not available.')); 
        }

        next();
    }
}