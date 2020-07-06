import React from 'react';
import type { LeagueTypes } from 'src/server/api/league/types';
import type { ApolloError } from 'apollo-boost';
import Spinner from '../../Layout/Spinner';
import capitalize from 'src/client/utils/capitalize';

export type LeaguePropTypes = {
  data: LeagueTypes | undefined;
  loading: boolean;
  error: ApolloError | undefined;
};

export default function League({ data, loading /*error*/ }: LeaguePropTypes) {
  // TODO: error 처리
  if (loading) {
    return <Spinner />;
  }
  console.log(data);
  return (
    <div>
      {data?.league.map((league) => {
        const { leagueId, tier } = league;
        return (
          <div key={leagueId}>
            {tier}
            <img
              src={`/assets/images/ranked-emblems/Emblem_${capitalize(tier)}.png`}
              alt={tier}
            />
          </div>
        );
      })}
    </div>
  );
}
