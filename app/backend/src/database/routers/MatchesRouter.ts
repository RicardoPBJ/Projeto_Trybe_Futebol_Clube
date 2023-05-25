import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
// import loginVerify from '../middlewares/loginVerify';
// import tokenVerify from '../middlewares/tokenVerify';

const route = Router();

const Matches = new MatchesController();

route.get('/', (req: Request, res: Response) => Matches.findAll(req, res));

export default route;
