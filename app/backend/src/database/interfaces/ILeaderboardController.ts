import { Response } from 'express';
import { Request } from 'express-serve-static-core';
import ILeaderboard from './ILeaderboard';

export default interface ILeaderBoardController {
  findAwayOrHome(req: Request, res: Response, awayOrHome: string):
  Promise<Response<ILeaderboard[] | { message: string }>>;
}
