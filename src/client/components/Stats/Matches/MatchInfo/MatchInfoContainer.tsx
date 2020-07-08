import React from 'react';
import MatchInfo from './MatchInfo';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql, DocumentNode } from 'apollo-boost';
import type { MatchTypes } from 'src/server/api/match/types';
import type { GameData } from 'src/server/api/data/types';

const client = new ApolloClient({ uri: '/.netlify/functions/match' });

export type MatchInfoContainerPropTypes = {
  gameId: string | undefined;
  encryptedSummonerId: string;
  gameDataState: GameData | null;
  index: number;
};

export default function MatchInfoContainer({
  gameId,
  encryptedSummonerId,
  gameDataState,
  index
}: MatchInfoContainerPropTypes) {
  const QUERY_MATCH = gql`
    query($gameId: String!) {
      matchData(gameId: $gameId) {
        gameVersion
        gameCreation
        gameDuration
        gameId
        queueId
        participants {
          participantId
          teamId
          championId
          spell1Id
          spell2Id
          timeline {
            goldPerMinDeltas
            csDiffPerMinDeltas
            lane
          }
          stats {
            win
            item0
            item1
            item2
            item3
            item4
            item5
            item6
            largestMultiKill
            kills
            deaths
            assists
            totalMinionsKilled
            wardsPlaced
            wardsKilled
            visionWardsBoughtInGame
          }
          championId
        }
        participantIdentities {
          participantId
          player {
            summonerId
          }
        }
        teams {
          win
          teamId
          bans {
            championId
            pickTurn
          }
        }
      }
    }
  `;
  const { loading, /*error,*/ data } = useQuery<MatchTypes>(
    QUERY_MATCH as DocumentNode,
    {
      client,
      skip: !gameId,
      variables: { gameId }
    }
  );

  return (
    <MatchInfo
      data={data}
      loading={loading}
      encryptedSummonerId={encryptedSummonerId}
      gameDataState={gameDataState}
      index={index}
    />
  );
}
