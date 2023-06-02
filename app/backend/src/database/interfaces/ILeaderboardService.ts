import ILeaderboard from './ILeaderboard';

export default interface ILeaderboardService {
  findAwayOrHome(awayOrHome: string): Promise<ILeaderboard[]>;
}
