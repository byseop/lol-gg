import React from 'react';
import ProfileContainer from './Profile';
import type {
  SummonerInfoTypes,
  MatchOptionTypes,
  MatchDataTypes
} from './types';
import Inner from '../Layout/Inner';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import LeagueContainer from './League';
import MatchesContainer from './Matches';
import type { Recent10GamesStatsTypes } from './StatsContainer';

type StatsPropTypes = {
  summonerInfo: SummonerInfoTypes | undefined;
  loading: boolean;
  matchData: MatchDataTypes[] | undefined;
  matchLoading: boolean;
  setMatchOption: React.Dispatch<React.SetStateAction<MatchOptionTypes>>;
  setRecent10GamesStats: React.Dispatch<
    React.SetStateAction<Recent10GamesStatsTypes[]>
  >;
};

export default function Stats({
  summonerInfo,
  loading,
  setMatchOption,
  matchData,
  matchLoading,
  setRecent10GamesStats
}: StatsPropTypes) {
  return (
    <>
      <Header />
      {summonerInfo &&
        summonerInfo.name &&
        summonerInfo.profileIconId &&
        !loading && (
          <StatsScreen>
            <Helmet>
              <title>{summonerInfo.name} - LoL GG Stats</title>
            </Helmet>
            <Inner>
              <ProfileContainer
                name={summonerInfo.name}
                profileIconId={summonerInfo.profileIconId}
              />
              <div className="stats_wrap">
                <LeagueContainer
                  encryptedSummonerId={summonerInfo.id as string}
                  setMatchOption={setMatchOption}
                  setRecent10GamesStats={setRecent10GamesStats}
                />
                <MatchesContainer
                  matchData={matchData}
                  matchLoading={matchLoading}
                  encryptedSummonerId={summonerInfo.id as string}
                  setRecent10GamesStats={setRecent10GamesStats}
                />
              </div>
            </Inner>
          </StatsScreen>
        )}
      {loading && <Spinner minHeight={78} />}
    </>
  );
}

const StatsScreen = styled.div`
  .stats_wrap {
    display: flex;
    margin-top: 2rem;
    align-items: flex-start;
  }
`;
