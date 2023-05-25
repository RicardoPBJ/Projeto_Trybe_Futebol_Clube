import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import IMatchesService from '../interfaces/IMatchesService';
import IMatchesController from '../interfaces/IMatchesController';

export default class MatchesController implements IMatchesController {
  private _MatchesService: IMatchesService;

  constructor() { this._MatchesService = new MatchesService(); }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const result = await this._MatchesService.findByProgress(inProgress === 'true');

      return res.status(200).json(result);
    }

    const result = await this._MatchesService.findAll();

    return res.status(200).json(result);
  }
}
