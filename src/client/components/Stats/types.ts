import { match } from 'react-router-dom';

export type MatchParams = {
  nickname: string;
};
export type StatsContainerPropTypes = {
  match: match<MatchParams>;
};
export type MatchDataTypes = {
  platformId?: string;
  gameId?: string;
  champion?: number;
  queue?: number;
  season?: number;
  timestamp?: string;
  role?: string;
  lane?: string;
};
export type MatchOptionTypes = {
  champion?: number;
  queue?: number;
  season?: number;
  endTime?: any;
  beginTime?: any;
  endIndex?: number;
  beginIndex?: number;
};
export type SummonerInfoTypes = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
export type SummonerDataTypes = {
  summonerInfo: SummonerInfoTypes,
  matchesInfo: {
    matches: MatchDataTypes[];
  }
}