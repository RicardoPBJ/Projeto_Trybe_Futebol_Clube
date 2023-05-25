import { Request, Response } from 'express';
import IMatch from './IMatch';

export default interface IMatchesController {
  findAll(req: Request, res: Response): Promise<Response<IMatch[]>>
  finishMatch(req: Request, res: Response): Promise<Response<{ message: string }>>
}
