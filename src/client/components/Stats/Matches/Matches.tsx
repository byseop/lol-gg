import React from 'react';
import type { MatchDataTypes } from '../types';
import styled from 'styled-components';
import MatchInfoContainer from './MatchInfo';
import Spinner from '../../Layout/Spinner';
import type { GameData } from 'src/server/api/data/types';

export type MatchesPropTypes = {
  matchData: MatchDataTypes[] | undefined;
  matchLoading: boolean;
  encryptedSummonerId: string;
  gameDataState: GameData | null;
};

function Matches({
  matchData,
  matchLoading,
  encryptedSummonerId,
  gameDataState
}: MatchesPropTypes) {
  return (
    <MatchesWrap>
      {matchLoading && <Spinner />}
      {!matchLoading &&
        matchData?.map((match: MatchDataTypes) => (
          <MatchInfoContainer
            key={match.gameId}
            gameId={match.gameId}
            encryptedSummonerId={encryptedSummonerId}
            gameDataState={gameDataState}
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
