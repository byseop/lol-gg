import React from 'react';
import Matches from './Matches';
import type { MatchDataTypes } from '../types';
import { useRecoilValue, selector } from 'recoil';
import { gameDataAtom } from 'src/client/pages/MainRoutes';
import type { Recent10GamesStatsTypes } from '../StatsContainer';

export type MatcheContainerPropTypes = {
  matchData: MatchDataTypes[] | undefined;
  matchLoading: boolean;
  encryptedSummonerId: string;
  setRecent10GamesStats: React.Dispatch<
    React.SetStateAction<Recent10GamesStatsTypes[]>
  >;
};

const gameDataSelector = selector({
  key: 'gameDataFromAtom',
  get: ({ get }) => {
    return get(gameDataAtom);
  }
});

export default function MatchesContainer({
  matchData,
  matchLoading,
  encryptedSummonerId,
  setRecent10GamesStats
}: MatcheContainerPropTypes) {
  const gameDataState = useRecoilValue(gameDataSelector);
  return (
    <Matches
      matchData={matchData}
      matchLoading={matchLoading}
      encryptedSummonerId={encryptedSummonerId}
      gameDataState={gameDataState}
      setRecent10GamesStats={setRecent10GamesStats}
    />
  );
}
