import IMatch from './IMatch';

export type updateResultType = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export default interface IMatchesService {
  findAll(): Promise<IMatch[]>;
  findByProgress(inProgress: boolean): Promise<IMatch[]>;
  finishMatch(id: number): Promise<number>;
  updateResult(body: updateResultType, id: number): Promise<number>;
}
