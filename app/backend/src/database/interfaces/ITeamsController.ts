import { Request, Response } from 'express';
import ITeams from './ITeams';

export default interface ITeamsController {
  findAll(req: Request, res: Response): Promise<Response<ITeams[]>>
  findById(req: Request, res: Response): Promise<Response<ITeams>>
}
