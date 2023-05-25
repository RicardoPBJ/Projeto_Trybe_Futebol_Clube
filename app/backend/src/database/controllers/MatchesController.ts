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

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this._MatchesService.finishMatch(+id);

    if (result <= 0) return res.status(404).json({ message: 'None match updated' });

    return res.status(200).json({ message: 'Finished' });
  }

  public async updateResult(req: Request, res: Response) {
    const result = await this._MatchesService.updateResult(req.body, +req.params.id);

    return res.status(200).json(result);
  }

  public async addMatch(req: Request, res: Response) {
    const result = await this._MatchesService.addMatch(req.body);

    return res.status(201).json(result);
  }
}
