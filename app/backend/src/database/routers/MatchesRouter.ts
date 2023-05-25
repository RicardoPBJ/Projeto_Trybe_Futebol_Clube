import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import tokenVerify from '../middlewares/tokenVerify';
// import loginVerify from '../middlewares/loginVerify';

const route = Router();

const Matches = new MatchesController();

route.get('/', (req: Request, res: Response) => Matches.findAll(req, res));
route.post('/', tokenVerify, (req: Request, res: Response) => {
  Matches.addMatch(req, res);
});
route.patch('/:id/finish', tokenVerify, (req: Request, res: Response) => {
  Matches.finishMatch(req, res);
});
route.patch('/:id', tokenVerify, (req: Request, res: Response) => {
  Matches.updateResult(req, res);
});

export default route;
