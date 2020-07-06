export type LeagueTypes = {
  league: {
    leagueId: string;
    queueType: 'RANKED_SOLO_5x5' | 'RANKED_TEAM_5x5';
    tier: Tire;
    rank: 'I' | 'II' | 'III' | 'IV';
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
  }[];
};

enum Tire {
  IRON = 'IRON',
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
  MASTER = 'MASTER',
  CHALLENGER = 'CHALLENGER'
}
