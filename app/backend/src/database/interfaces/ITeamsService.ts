import ITeams from './ITeams';

export default interface ITeamsService {
  findAll(): Promise<ITeams[]>
  findById(id: number): Promise<ITeams | null>
}
