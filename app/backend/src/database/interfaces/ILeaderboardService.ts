import ILeaderboard from './ILeaderboard';

export default interface ILeaderboardService {
  findHome(): Promise<ILeaderboard[]>;
}
