import { Router, Request, Response } from 'express';
import LoginController from '../controllers/LoginController';
import loginVerify from '../middlewares/loginVerify';

const route = Router();

const Login = new LoginController();

route.post('/', loginVerify, (req: Request, res: Response) => {
  Login.loginUser(req, res);
});

export default route;
