import { Application } from 'express';
import AuthMiddleware from '../middleware/auth'
import AuthController from '../controllers/auth'
import AuthValidator from '../validators/auth';


export default (app: Application) => {
    app.get('/v1/auth/me', AuthMiddleware, AuthController.getMe);
    app.post('/v1/auth/login', AuthValidator.login, AuthController.login);
    app.post('/v1/auth/signup', AuthValidator.signup, AuthController.signup);
    app.post('/v1/auth/logout', AuthMiddleware, AuthController.logout);
};