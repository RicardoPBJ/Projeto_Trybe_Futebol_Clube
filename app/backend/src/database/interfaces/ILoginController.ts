import { Request, Response } from 'express';

export default interface ILoginController {
  loginUser(req: Request, res: Response): Promise<Response<{ status: number, message: string }>>
}
