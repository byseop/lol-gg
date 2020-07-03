import React from 'react';
import ProfileContainer from './Profile';
import { SummonerInfoTypes } from './types';
import Inner from '../Layout/Inner';
import Header from '../Layout/Header';

type StatsPropTypes = {
  summonerInfo: SummonerInfoTypes | undefined;
};

export default function Stats({ summonerInfo }: StatsPropTypes) {
  return (
    <>
      <Header />
      {summonerInfo && summonerInfo.name && summonerInfo.profileIconId && (
        <Inner>
          <ProfileContainer
            name={summonerInfo.name}
            profileIconId={summonerInfo.profileIconId}
          />
        </Inner>
      )}
    </>
  );
}
