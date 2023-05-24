import { Request, Response } from 'express';
import ITeamsController from '../interfaces/ITeamsController';
import ITeamsService from '../interfaces/ITeamsService';
import TeamsService from '../services/TeamsService';

export default class TeamsController implements ITeamsController {
  private _TeamsService: ITeamsService;

  constructor() {
    this._TeamsService = new TeamsService();
  }

  public async findAll(_req: Request, res: Response) {
    const result = await this._TeamsService.findAll();
    return res.status(200).json(result);
  }

  public async findById(req: Request, res: Response) {
    const result = await this._TeamsService.findById(Number(req.params.id));
    if (!result) return res.status(400).json({ message: 'Team not found' });
    return res.status(200).json(result);
  }
}
