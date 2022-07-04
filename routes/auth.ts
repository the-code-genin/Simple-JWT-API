import { Application } from 'express';
import AuthMiddleware from '../middleware/auth'
import AuthController from '../controllers/auth'
import AuthValidator from '../validators/auth';


export default (app: Application) => {
    app.get('/me', AuthMiddleware, AuthController.getMe);
    app.post('/login', AuthValidator.login, AuthController.login);
    app.post('/signup', AuthValidator.signup, AuthController.signup);
    app.post('/logout', AuthMiddleware, AuthController.logout);
};