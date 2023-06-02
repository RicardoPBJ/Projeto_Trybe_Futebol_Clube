import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const route = Router();
const leaderBoardController = new LeaderboardController();

route.get('/home', (req: Request, res: Response) => {
  leaderBoardController.findAwayOrHome(req, res, 'home');
});

route.get('/away', (req: Request, res: Response) => {
  leaderBoardController.findAwayOrHome(req, res, 'away');
});

export default route;
