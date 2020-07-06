export type LeagueTypes = {
  league: {
    leagueId: string;
    queueType: string;
    tier:
      | 'IRON'
      | 'BRONZE'
      | 'SILVER'
      | 'GOLD'
      | 'PLATINUM'
      | 'DIAMOND'
      | 'MASTER'
      | 'CHALLENGER';
    rank: string;
    summonerId: string;
    summonerName: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
  }[]
};
