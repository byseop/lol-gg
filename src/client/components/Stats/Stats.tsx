import React from 'react';
import ProfileContainer from './Profile';
import { SummonerInfoTypes, MatchOptionTypes, MatchDataTypes } from './types';
import Inner from '../Layout/Inner';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import LeagueContainer from './League';
import MatchesContainer from './Matches';

type StatsPropTypes = {
  summonerInfo: SummonerInfoTypes | undefined;
  loading: boolean;
  matchData: MatchDataTypes[] | undefined;
  matchLoading: boolean;
  setMatchOption: React.Dispatch<React.SetStateAction<MatchOptionTypes>>;
};

export default function Stats({
  summonerInfo,
  loading,
  setMatchOption,
  matchData,
  matchLoading
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
                />
                <MatchesContainer matchData={matchData} matchLoading={matchLoading} encryptedSummonerId={summonerInfo.id as string} />
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
