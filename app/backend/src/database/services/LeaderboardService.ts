import { ModelStatic } from 'sequelize';
import ILeaderboardService from '../interfaces/ILeaderboardService';
import Matches from '../models/Matches';
import Teams from '../models/Teams';
import IMatchesResult from '../interfaces/IMatchResult';
import TeamAtributtes from '../utils/TeamAtributtes';
import ILeaderboard from '../interfaces/ILeaderboard';

const away = '/away';

export default class LeaderBoardService implements ILeaderboardService {
  private modelTeam: ModelStatic<Teams> = Teams;
  private modelMatch: ModelStatic<Matches> = Matches;

  private async findAllTeams(): Promise<Teams[]> {
    const result = await this.modelTeam.findAll();
    return result;
  }

  private async findAllMatches(): Promise<Matches[]> {
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

  public static addHomeAtributtes(matches: Matches[], teamName: string) {
    const teamInfo = new TeamAtributtes(teamName);
    teamInfo.totalGames = matches.length;
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      const { totalPoints, totalVictories, totalDraws, totalLosses } = LeaderBoardService
        .findMatchResult(homeTeamGoals, awayTeamGoals);
      teamInfo.totalPoints += totalPoints;
      teamInfo.totalVictories += totalVictories;
      teamInfo.totalDraws += totalDraws;
      teamInfo.totalLosses += totalLosses;
      teamInfo.goalsFavor += homeTeamGoals;
      teamInfo.goalsOwn += awayTeamGoals;
      const { goalsFavor, goalsOwn, totalGames, totalPoints: totalP } = teamInfo;
      teamInfo.goalsBalance = goalsFavor - goalsOwn;
      teamInfo.efficiency = +(((totalP / (totalGames * 3))) * 100).toFixed(2);
    });
    return teamInfo;
  }

  public static addAwayAtributtes(matches: Matches[], teamName: string) {
    const teamInfo = new TeamAtributtes(teamName);
    teamInfo.totalGames = matches.length;
    matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      const { totalPoints, totalVictories, totalDraws, totalLosses } = LeaderBoardService
        .findMatchResult(awayTeamGoals, homeTeamGoals);
      teamInfo.totalPoints += totalPoints;
      teamInfo.totalVictories += totalVictories;
      teamInfo.totalDraws += totalDraws;
      teamInfo.totalLosses += totalLosses;
      teamInfo.goalsFavor += awayTeamGoals;
      teamInfo.goalsOwn += homeTeamGoals;
      const { goalsFavor, goalsOwn, totalGames, totalPoints: totalP } = teamInfo;
      teamInfo.goalsBalance = goalsFavor - goalsOwn;
      teamInfo.efficiency = +(((totalP / (totalGames * 3))) * 100).toFixed(2);
    });
    return teamInfo;
  }

  public static addAllClass(awayAtts: ILeaderboard[], homeAtts: ILeaderboard[]) {
    const result = homeAtts.map((homeAtt) => {
      const teamMatches = awayAtts.filter((awayTeam) => homeAtt.name === awayTeam.name);
      const allAtt = new TeamAtributtes(homeAtt.name);
      teamMatches.forEach((atualTeam) => {
        allAtt.totalGames = atualTeam.totalGames + homeAtt.totalGames;
        allAtt.totalPoints = atualTeam.totalPoints + homeAtt.totalPoints;
        allAtt.totalVictories = atualTeam.totalVictories + homeAtt.totalVictories;
        allAtt.totalLosses = atualTeam.totalLosses + homeAtt.totalLosses;
        allAtt.totalDraws = atualTeam.totalDraws + homeAtt.totalDraws;
        allAtt.goalsFavor = atualTeam.goalsFavor + homeAtt.goalsFavor;
        allAtt.goalsOwn = atualTeam.goalsOwn + homeAtt.goalsOwn;

        const { goalsFavor, goalsOwn, totalGames, totalPoints: totalP } = allAtt;

        allAtt.goalsBalance = goalsFavor - goalsOwn;
        allAtt.efficiency = +(((totalP / (totalGames * 3))) * 100).toFixed(2);
      });
      return allAtt;
    });
    return result;
  }

  private static findTeam(team: Teams, matches: Matches[], awayOrHome: string) {
    if (awayOrHome === away) {
      const awayMatches = matches.filter((match) => match.awayTeamId === team.id);
      const result = LeaderBoardService.addAwayAtributtes(awayMatches, team.teamName);
      return result;
    }
    const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
    const result = LeaderBoardService.addHomeAtributtes(homeMatches, team.teamName);
    return result;
  }

  public static orderTeams(awayOrHomeTeam: ILeaderboard[]) {
    const result = awayOrHomeTeam.sort((teamA, teamB) => {
      if (teamA.totalPoints !== teamB.totalPoints) return teamB.totalPoints - teamA.totalPoints;
      if (teamA.totalVictories !== teamB.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      }
      if (teamA.goalsBalance !== teamB.goalsBalance) return teamB.goalsBalance - teamA.goalsBalance;
      return teamB.goalsFavor - teamA.goalsFavor;
    });

    return result;
  }

  public async findAwayAndHome() {
    const allTeams = await this.findAllTeams();
    const allMatches = await this.findAllMatches();

    const homeAtt = allTeams.map((team) => {
      const homeMatches = allMatches.filter((match) => match.homeTeamId === team.id);

      const result = LeaderBoardService
        .addHomeAtributtes(homeMatches, team.teamName);

      return result;
    });

    const awayAtt = allTeams.map((team) => {
      const awayMatches = allMatches.filter((match) => match.awayTeamId === team.id);

      const result = LeaderBoardService
        .addAwayAtributtes(awayMatches, team.teamName);

      return result;
    });

    const allClassification = LeaderBoardService.addAllClass(awayAtt, homeAtt);
    const result = LeaderBoardService.orderTeams(allClassification);

    return result;
  }

  public async findAwayOrHome(awayOrHome: string) {
    const allTeams = await this.findAllTeams();
    const allMatches = await this.findAllMatches();

    const teams = allTeams.map((team) => LeaderBoardService.findTeam(team, allMatches, awayOrHome));

    const result = LeaderBoardService.orderTeams(teams);

    return result;
  }
}
