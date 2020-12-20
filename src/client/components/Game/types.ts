import type {
  Player,
  Ban,
  Stats,
  Timeline,
  Team
} from 'src/server/api/match/types';

export type ParticipantDataType = {
  player: Player;
  participantId: number;
  teamId: number;
  championId: number;
  spell1Id: number;
  spell2Id: number;
  stats: Stats;
  timeline: Timeline;
};

export type TeamStats = {
  kills: number;
  deaths: number;
  assists: number;
  gold: number;
};

export type TeamDataType = {
  participants: ParticipantDataType[];
  ban: Ban[];
  win: boolean;
  teamStats: TeamStats;
  object: Team;
};

export type ResultDataType = {
  blue: TeamDataType;
  red: TeamDataType;
};
