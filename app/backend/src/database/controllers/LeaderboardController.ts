import { Request, Response } from 'express';
import ILeaderboardController from '../interfaces/ILeaderboardController';
import LeaderboardService from '../services/LeaderboardService';
import ILeaderboardService from '../interfaces/ILeaderboardService';

export default class LeaderboardController implements ILeaderboardController {
  private _leaderBoardService: ILeaderboardService;

  constructor() {
    this._leaderBoardService = new LeaderboardService();
  }

  public async findAwayAndHome(req: Request, res: Response) {
    const result = await this._leaderBoardService.findAwayAndHome();

    if (result.length === 0) {
      return res.status(404).json({ message: 'Something unexpected happened' });
    }
    return res.status(200).json(result);
  }

  public async findAwayOrHome(req: Request, res: Response) {
    const result = await this._leaderBoardService.findAwayOrHome(req.path);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Something unexpected happened' });
    }
    return res.status(200).json(result);
  }
}
