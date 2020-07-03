import React from 'react';
import ProfileContainer from './Profile';
import { SummonerInfoTypes } from './types';
import Inner from '../Layout/Inner';

type StatsPropTypes = {
  summonerInfo: SummonerInfoTypes | undefined;
};

export default function Stats({ summonerInfo }: StatsPropTypes) {
  console.log(summonerInfo);
  if (summonerInfo) {
    const { name, profileIconId } = summonerInfo;
    return (
      <Inner>
        <ProfileContainer name={name} profileIconId={profileIconId} />
      </Inner>
    );
  }
  return null;
}
