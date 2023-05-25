import { Request, Response } from 'express';

export type FindRoleType = { role: string };

export default interface ILoginController {
  loginUser(req: Request, res: Response): Promise<Response<{ status: number, message: string }>>
  findRole(req: Request, res: Response): Promise<{ status: number, message: FindRoleType }>
}
