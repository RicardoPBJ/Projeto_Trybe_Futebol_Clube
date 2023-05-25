import { ModelStatic } from 'sequelize';
import IMatchesService, { updateResultType } from '../interfaces/IMatchesService';
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

  public async finishMatch(id: number): Promise<number> {
    const [result] = await this.model.update({ inProgress: false }, { where: { id } });
    return result;
  }

  public async updateResult(body: updateResultType, id: number): Promise<number> {
    const [result] = await this.model.update(
      { homeTeamGoals: body.homeTeamGoals, awayTeamGoals: body.awayTeamGoals },
      { where: { id } },
    );
    return result;
  }
}
