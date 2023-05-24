import { ModelStatic } from 'sequelize';
import ITeamsService from '../interfaces/ITeamsService';
import Teams from '../models/Teams';
import ITeams from '../interfaces/ITeams';

export default class TeamsService implements ITeamsService {
  protected model: ModelStatic<Teams> = Teams;

  public async findAll(): Promise<ITeams[]> {
    return this.model.findAll();
  }

  public async findById(id: number): Promise<ITeams | null> {
    return this.model.findOne({ where: { id } });
  }
}
