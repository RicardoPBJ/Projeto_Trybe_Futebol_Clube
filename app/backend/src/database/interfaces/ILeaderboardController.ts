import { Response } from 'express';
import { Request } from 'express-serve-static-core';
import ILeaderboard from './ILeaderboard';

export default interface LeaderBoardControllerInterface {
  findHome(req: Request, res: Response): Promise<Response<ILeaderboard[] | { message: string }>>;
}
