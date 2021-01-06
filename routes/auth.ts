import AuthMiddleware from '../middleware/auth'
import AuthController from '../controllers/auth'
import { Application } from 'express';
import AuthValidator from '../validators/auth';


export default (app: Application) => {
    app.get('/api/v1/auth', AuthMiddleware.handle, AuthController.index);
    app.post('/api/v1/auth/login', AuthValidator.login, AuthController.login);
    app.post('/api/v1/auth/signup', AuthValidator.signup, AuthController.signup);
    app.post('/api/v1/auth/logout', AuthMiddleware.handle, AuthController.logout);
    app.post('/api/v1/auth/refresh', AuthMiddleware.handle, AuthController.refresh);
};