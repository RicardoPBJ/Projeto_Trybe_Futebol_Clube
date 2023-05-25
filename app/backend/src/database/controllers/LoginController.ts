import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import ILoginController from '../interfaces/ILoginController';
import ILoginService from '../interfaces/ILoginService';

export default class LoginController implements ILoginController {
  private _LoginService: ILoginService;

  constructor() { this._LoginService = new LoginService(); }

  public async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, message } = await this._LoginService.loginUser({ email, password });

    return res.status(status).json(message);
  }
}
