import { Router, Request, Response } from 'express';
import LoginController from '../controllers/LoginController';
import loginVerify from '../middlewares/loginVerify';
import tokenVerify from '../middlewares/tokenVerify';

const route = Router();

const Login = new LoginController();

route.post('/', loginVerify, (req: Request, res: Response) => {
  Login.loginUser(req, res);
});

route.get('/role', tokenVerify, (req: Request, res: Response) => {
  LoginController.findRole(req, res);
});

export default route;
