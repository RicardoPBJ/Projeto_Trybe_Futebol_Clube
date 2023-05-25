import { Response, Request, NextFunction } from 'express';
import TeamsService from '../services/TeamsService';

const matchVerify = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const Teams = new TeamsService();

  const teamsVerify = await Promise.all([homeTeamId, awayTeamId]
    .map((teamId) => Teams.findById(teamId)));

  if (teamsVerify.includes(null)) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default matchVerify;
