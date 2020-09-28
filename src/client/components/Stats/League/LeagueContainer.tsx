import React, { useCallback } from 'react';
import League from './League';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql, DocumentNode } from 'apollo-boost';
import type { LeagueTypes, QueueType } from 'src/server/api/league/types';
import type { MatchOptionTypes } from '../types';

type LeagueContainerPropTypes = {
  encryptedSummonerId: string;
  setMatchOption: React.Dispatch<React.SetStateAction<MatchOptionTypes>>;
};

const leagueClient = new ApolloClient({ uri: '/.netlify/functions/league' });

export default function LeagueContainer({
  encryptedSummonerId,
  setMatchOption,
}: LeagueContainerPropTypes) {
  const QUERY_LEAGUE = gql`
    query($encryptedSummonerId: String!) {
      league(encryptedSummonerId: $encryptedSummonerId) {
        leagueId
        tier
        rank
        queueType
        summonerName
        wins
        losses
        leaguePoints
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

  const handleChangeLeague = useCallback(
    (queueType: QueueType) => {
      switch (queueType) {
        case 'RANKED_SOLO_5x5':
          setMatchOption((prev) => {
            return {
              ...prev,
              queue: 420
            };
          });
          break;
        case 'RANKED_FLEX_SR':
          setMatchOption((prev) => {
            return {
              ...prev,
              queue: 440
            };
          });
          break;
        default:
          setMatchOption((prev) => {
            return {
              ...prev,
              queue: undefined
            };
          });
          break;
      }
    },
    [setMatchOption]
  );

  return (
    <League
      data={data}
      loading={loading}
      error={error}
      handleChangeLeague={handleChangeLeague}
    />
  );
}
