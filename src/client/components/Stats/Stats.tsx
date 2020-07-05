import React from 'react';
import ProfileContainer from './Profile';
import { SummonerInfoTypes } from './types';
import Inner from '../Layout/Inner';
import Header from '../Layout/Header';
import { Helmet } from 'react-helmet';

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
          <Inner>
            <ProfileContainer
              name={summonerInfo.name}
              profileIconId={summonerInfo.profileIconId}
            />

            <Helmet>
              <title>{summonerInfo.name} - LoL GG Stats</title>
            </Helmet>
          </Inner>
        )}
    </>
  );
}
