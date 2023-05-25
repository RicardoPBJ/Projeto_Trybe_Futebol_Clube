import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import tokenVerify from '../middlewares/tokenVerify';
// import loginVerify from '../middlewares/loginVerify';

const route = Router();

const Matches = new MatchesController();

route.get('/', (req: Request, res: Response) => Matches.findAll(req, res));
route.patch('/:id/finish', tokenVerify, (req: Request, res: Response) => {
  Matches.finishMatch(req, res);
});

export default route;
