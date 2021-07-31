import { Application } from 'express';
import AuthMiddleware from '../middleware/auth'
import AuthController from '../controllers/auth'
import AuthValidator from '../validators/auth';


export default (app: Application) => {
    app.get('/api/v1/auth', AuthMiddleware, AuthController.index);
    app.post('/api/v1/auth/login', AuthValidator.login, AuthController.login);
    app.post('/api/v1/auth/signup', AuthValidator.signup, AuthController.signup);
    app.post('/api/v1/auth/logout', AuthMiddleware, AuthController.logout);
};