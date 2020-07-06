import React from 'react';
import type { LeagueTypes } from 'src/server/api/league/types';
import type { ApolloError } from 'apollo-boost';
import Spinner from '../../Layout/Spinner';

export type LeaguePropTypes = {
  data: LeagueTypes | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

export default function League({ data, loading, error }: LeaguePropTypes) {
  if (loading) {
    return <Spinner />
  }
  return (
    <div>
      {data?.league.map(league => <div key={league.leagueId}>{league.tier}</div>)}
    </div>
  );
}
