import { Request, Response } from 'express';
import ITeamsController from '../interfaces/ITeamsController';
import ITeamsService from '../interfaces/ITeamsService';
import TeamsService from '../services/TeamsService';

export default class TeamsController implements ITeamsController {
  private _TeamsService: ITeamsService;

  constructor() {
    this._TeamsService = new TeamsService();
  }

  public async getAll(_req: Request, res: Response) {
    const result = await this._TeamsService.getAll();
    return res.status(200).json(result);
  }
}
