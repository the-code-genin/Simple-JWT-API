import { Application } from 'express';
import AuthMiddleware from '../middleware/auth'
import AuthController from '../controllers/auth'
import AuthValidator from '../validators/auth';


export default (app: Application) => {
    app.get('/auth/me', AuthMiddleware, AuthController.getMe);
    app.post('/auth/login', AuthValidator.login, AuthController.login);
    app.post('/auth/signup', AuthValidator.signup, AuthController.signup);
    app.post('/auth/logout', AuthMiddleware, AuthController.logout);
};