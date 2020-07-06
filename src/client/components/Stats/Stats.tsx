import React from 'react';
import ProfileContainer from './Profile';
import { SummonerInfoTypes } from './types';
import Inner from '../Layout/Inner';
import Header from '../Layout/Header';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import LeagueContainer from './League';

type StatsPropTypes = {
  summonerInfo: SummonerInfoTypes | undefined;
  loading: boolean;
};

export default function Stats({ summonerInfo, loading }: StatsPropTypes) {
  return (
    <>
      <Header />
      {summonerInfo &&
        summonerInfo.name &&
        summonerInfo.profileIconId &&
        !loading && (
          <StatsScreen>
            <Inner>
              <Helmet>
                <title>{summonerInfo.name} - LoL GG Stats</title>
              </Helmet>
              <ProfileContainer
                name={summonerInfo.name}
                profileIconId={summonerInfo.profileIconId}
              />
              <div className="stats_wrap">
                <div className="league_selector_wrap">
                  <LeagueContainer
                    encryptedSummonerId={summonerInfo.id as string}
                  />
                </div>
              </div>
            </Inner>
          </StatsScreen>
        )}
    </>
  );
}

const StatsScreen = styled.div`
  .stats_wrap {
    display: flex;
  }
`;
