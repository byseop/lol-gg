import React, { useState } from 'react';
import Stats from './Stats';
import { match } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql, DocumentNode } from 'apollo-boost';

type MatchParams = {
  nickname: string;
};
type StatsContainerPropTypes = {
  match: match<MatchParams>;
};
type MatchDataTypes = {
  platformId?: string;
  gameId?: string;
  champion?: number;
  queue?: number;
  season?: number;
  timestamp?: string;
  role?: string;
  lane?: string;
};
type MatchOptionTypes = {
  champion?: number;
  queue?: number;
  season?: number;
  endTime?: any;
  beginTime?: any;
  endIndex?: number;
  beginIndex?: number;
};

const statsClient = new ApolloClient({ uri: '/.netlify/functions/stats' });

export default function StatsContainer({ match }: StatsContainerPropTypes) {
  const { nickname } = match.params;
  const [matchOption, setMatchOption] = useState<MatchOptionTypes>({
    endIndex: 20,
    season: 13,
  });

  const QUERY_NICKNAME = gql`
    {
      summonerInfo(nickname: "${nickname}") {
        name
        accountId
      }
    }
    `;

  const { loading, error, data } = useQuery(QUERY_NICKNAME, {
    client: statsClient,
    skip: !nickname
  });

  const QUERY_MATCHES = gql`
    query ($matchOption: MatchOptions) {
      matchesInfo(accountId: "${data?.summonerInfo?.accountId}", params: $matchOption) {
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
  `;

  const {
    loading: matchesLoading,
    error: matchesError,
    data: matchesData
  } = useQuery<MatchDataTypes>(QUERY_MATCHES as DocumentNode, {
    client: statsClient,
    skip: !data?.summonerInfo?.accountId || !matchOption,
    variables: { matchOption }
  });

  console.log(loading, error, data);
  console.log(matchesLoading, matchesError, matchesData);
  return <Stats />;
}
