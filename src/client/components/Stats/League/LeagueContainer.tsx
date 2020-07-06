import React from 'react';
import League from './League';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql, DocumentNode } from 'apollo-boost';
import type { LeagueTypes } from 'src/server/api/league/types';

type LeagueContainerPropTypes = {
  encryptedSummonerId: string;
};

const leagueClient = new ApolloClient({ uri: '/.netlify/functions/league' });

export default function LeagueContainer({
  encryptedSummonerId
}: LeagueContainerPropTypes) {
  const QUERY_LEAGUE = gql`
    query($encryptedSummonerId: String!) {
      league(encryptedSummonerId: $encryptedSummonerId) {
        leagueId,
        tier,
        rank,
        queueType,
        summonerName,
        wins,
        losses
      }
    }
  `;

  const { loading, error, data } = useQuery<LeagueTypes>(
    QUERY_LEAGUE as DocumentNode,
    {
      client: leagueClient,
      skip: !encryptedSummonerId,
      variables: { encryptedSummonerId }
    }
  );

  return <League data={data} loading={loading} error={error} />;
}
