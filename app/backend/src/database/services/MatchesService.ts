import { ModelStatic } from 'sequelize';
import IMatchesService from '../interfaces/IMatchesService';
import Matches from '../models/Matches';
import Teams from '../models/Teams';

export default class MatchesService implements IMatchesService {
  protected model: ModelStatic<Matches> = Matches;

  public async findAll(): Promise<Matches[]> {
    return this.model.findAll({
      include:
      [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }

  public async findByProgress(inProgress: boolean): Promise<Matches[]> {
    return this.model.findAll({
      where: { inProgress },
      include:
      [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
  }
}