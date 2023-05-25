import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import ILoginService from '../interfaces/ILoginService';

export default class LoginController {
  private _LoginService: ILoginService;

  constructor() { this._LoginService = new LoginService(); }

  public async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, message } = await this._LoginService.loginUser({ email, password });

    return res.status(status).json(message);
  }

  public static async findRole(req: Request, res: Response) {
    const { user } = req.body;

    return res.status(200).json({ role: user.role });
  }
}
