import React, { useState } from 'react';
import Stats from './Stats';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql, DocumentNode } from 'apollo-boost';
import type {
  StatsContainerPropTypes,
  MatchOptionTypes,
  SummonerDataTypes,
} from './types';


const statsClient = new ApolloClient({ uri: '/.netlify/functions/stats' });

export default function StatsContainer({ match }: StatsContainerPropTypes) {
  const { nickname } = match.params;
  const [matchOption, setMatchOption] = useState<MatchOptionTypes>({
    endIndex: 10,
    season: 13
  });

  const QUERY_SUMMONER = gql`
    query($nickname: String!) {
      summonerData(nickname: $nickname) {
        summonerInfo {
          id
          accountId
          puuid
          name
          profileIconId
          revisionDate
          summonerLevel
        }
      }
    }
  `;

  const QUERY_MATCHES = gql`
    query($nickname: String!, $matchOption: MatchOptions) {
      summonerData(nickname: $nickname, params: $matchOption) {
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

  const { loading, /*error,*/ data } = useQuery<SummonerDataTypes>(
    QUERY_SUMMONER as DocumentNode,
    {
      client: statsClient,
      skip: !nickname,
      variables: { nickname }
    }
  );

  const {
    loading: matchLoading,
    /*error: matchError,*/
    data: matchData
  } = useQuery<SummonerDataTypes>(QUERY_MATCHES as DocumentNode, {
    client: statsClient,
    skip: !nickname || !matchOption,
    variables: { nickname, matchOption }
  });

  // console.log(loading, error, data);
  // console.log(matchLoading, matchError, matchData);
  return (
    <Stats
      summonerInfo={data?.summonerData?.summonerInfo}
      loading={loading} // summoner loading
      matchData={matchData?.summonerData?.matchesInfo?.matches}
      matchLoading={matchLoading}
      setMatchOption={setMatchOption}
    />
  );
}
