import { Request, Response } from 'express';
import ILeaderboardController from '../interfaces/ILeaderboardController';
import LeaderboardService from '../services/LeaderboardService';
import ILeaderboardService from '../interfaces/ILeaderboardService';

export default class LeaderboardController implements ILeaderboardController {
  private _leaderBoardService: ILeaderboardService;

  constructor() {
    this._leaderBoardService = new LeaderboardService();
  }

  public async findHome(_req: Request, res: Response) {
    const result = await this._leaderBoardService.findHome();

    if (result.length === 0) {
      return res.status(404).json({ message: 'Something unexpected happened' });
    }
    return res.status(200).json(result);
  }
}
