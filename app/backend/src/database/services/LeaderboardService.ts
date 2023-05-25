import { ModelStatic } from 'sequelize';
import ILeaderboardService from '../interfaces/ILeaderboardService';
import Matches from '../models/Matches';
import Teams from '../models/Teams';
import IMatchesResult from '../interfaces/IMatchResult';
import TeamAtributtes from '../utils/TeamAtributtes';

export default class LeaderBoardService implements ILeaderboardService {
  private modelTeam: ModelStatic<Teams> = Teams;
  private modelMatch: ModelStatic<Matches> = Matches;

  private async findAllTeams(): Promise<Teams[]> {
    const result = await this.modelTeam.findAll();
    return result;
  }

  private async findAllMatches(): Promise <Matches[]> {
    const result = await this.modelMatch.findAll({ where: { inProgress: false } });
    return result;
  }

  private static findMatchResult(teamOne: number, teamTwo: number): IMatchesResult {
    const result = {
      totalPoints: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    if (teamOne > teamTwo) {
      result.totalPoints += 3;
      result.totalVictories += 1;
    } else if (teamOne === teamTwo) {
      result.totalPoints += 1;
      result.totalDraws += 1;
    } else {
      result.totalLosses += 1;
    }
    return result;
  }

  private static homeTeam(team: Teams, matches: Matches[]) {
    const teamInfo = new TeamAtributtes(team.teamName);

    const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
    teamInfo.totalGames = homeMatches.length;

    homeMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      const { totalPoints, totalVictories, totalDraws, totalLosses } = LeaderBoardService
        .findMatchResult(homeTeamGoals, awayTeamGoals);
      const { goalsFavor, goalsOwn, totalGames } = teamInfo;

      teamInfo.totalPoints += totalPoints;
      teamInfo.totalVictories += totalVictories;
      teamInfo.totalDraws += totalDraws;
      teamInfo.totalLosses += totalLosses;

      teamInfo.goalsFavor += homeTeamGoals;
      teamInfo.goalsOwn += awayTeamGoals;

      teamInfo.goalsBalance = goalsFavor - goalsOwn;
      teamInfo.efficiency = parseInt(((totalPoints / (totalGames * 3)) * 100).toFixed(2), 10);
    });
    return teamInfo;
  }

  public async findHome() {
    const allTeams = await this.findAllTeams();
    const allMatches = await this.findAllMatches();

    const homeTeam = allTeams.map((team) => LeaderBoardService.homeTeam(team, allMatches));

    return homeTeam;
  }
}
