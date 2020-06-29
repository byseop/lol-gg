import React, { useState } from 'react';
import Stats from './Stats';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql, DocumentNode } from 'apollo-boost';
import {
  StatsContainerPropTypes,
  MatchOptionTypes,
  SummonerDataTypes
} from './types';

const statsClient = new ApolloClient({ uri: '/.netlify/functions/stats' });

export default function StatsContainer({ match }: StatsContainerPropTypes) {
  const { nickname } = match.params;
  const [matchOption, setMatchOption] = useState<MatchOptionTypes>({
    endIndex: 20,
    season: 13
  });

  const QUERY_SUMMONER = gql`
    query($nickname: String!, $matchOption: MatchOptions) {
      summonerData(nickname: $nickname, params: $matchOption) {
        summonerInfo {
          name
        }
        matchesInfo {
          matches {
            platformId
            gameId
            champion
            queue
            season
            timestamp
            role
            lane
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery<SummonerDataTypes>(
    QUERY_SUMMONER as DocumentNode,
    {
      client: statsClient,
      skip: !nickname || !matchOption,
      variables: { nickname, matchOption }
    }
  );

  console.log(loading, error, data);
  return <Stats />;
}
