import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/TeamsController';

const route = Router();

const TeamController = new TeamsController();

route.get('/', (req: Request, res: Response) => {
  TeamController.getAll(req, res);
});

// route.get('/:id', (req: Request, res: Response) => {
//   TeamController.getAll(req, res);
// });

export default route;
