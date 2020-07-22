import React from 'react';
import type { MatchDataTypes } from '../types';
import styled from 'styled-components';
import MatchInfoContainer from './MatchInfo';
import Spinner from '../../Layout/Spinner';
import type { GameData } from 'src/server/api/data/types';
import type { Recent10GamesStatsTypes } from '../StatsContainer';

export type MatchesPropTypes = {
  matchData: MatchDataTypes[] | undefined;
  matchLoading: boolean;
  encryptedSummonerId: string;
  gameDataState: GameData | null;
  setRecent10GamesStats: React.Dispatch<
    React.SetStateAction<Recent10GamesStatsTypes[]>
  >;
};

function Matches({
  matchData,
  matchLoading,
  encryptedSummonerId,
  gameDataState,
  setRecent10GamesStats
}: MatchesPropTypes) {
  return (
    <MatchesWrap>
      {matchLoading && <Spinner />}
      {matchData?.map((match: MatchDataTypes, i) => (
        <MatchInfoContainer
          key={match.gameId}
          gameId={match.gameId}
          encryptedSummonerId={encryptedSummonerId}
          gameDataState={gameDataState}
          index={i}
          setRecent10GamesStats={setRecent10GamesStats}
        />
      ))}
    </MatchesWrap>
  );
}

export default React.memo(Matches);

const MatchesWrap = styled.div`
  margin-left: 1rem;
  flex: 1;
`;
