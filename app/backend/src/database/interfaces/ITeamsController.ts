import { Request, Response } from 'express';
import ITeams from './ITeams';

export default interface ITeamsController {
  getAll(req: Request, res: Response): Promise<Response<ITeams[]>>
}
