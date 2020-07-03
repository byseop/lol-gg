export type SummonerInfoTypes = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};

export type MatchInfoTypes = {
  platformId: string;
  gameId: string;
  champion: number;
  queue: number;
  season: number;
  timestamp: string;
  role: string;
  lane: string;
}
