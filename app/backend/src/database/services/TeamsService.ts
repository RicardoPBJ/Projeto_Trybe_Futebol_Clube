import { ModelStatic } from 'sequelize';
import ITeamsService from '../interfaces/ITeamsService';
import Teams from '../models/Teams';
import ITeams from '../interfaces/ITeams';

export default class TeamsService implements ITeamsService {
  protected model: ModelStatic<Teams> = Teams;

  public async getAll(): Promise<ITeams[]> {
    return this.model.findAll();
  }
}
