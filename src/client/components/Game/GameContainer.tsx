import React from 'react';
import Game from './Game';
import ApolloClient, { gql, DocumentNode } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import type { match } from 'react-router-dom';
import type { MatchTypes } from 'src/server/api/match/types';
import Spinner from '../Layout/Spinner';

type GameParams = {
  gameId: string;
};
type GameContainerPropTypes = {
  match: match<GameParams>;
};

const client = new ApolloClient({ uri: '/.netlify/functions/match' });

export default function GameContainer({ match }: GameContainerPropTypes) {
  const { gameId } = match.params;
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
            neutralMinionsKilled
            wardsPlaced
            wardsKilled
            visionWardsBoughtInGame
            perk0
            perkPrimaryStyle
            perkSubStyle
            goldEarned
            totalDamageDealtToChampions
            totalHeal
            totalDamageTaken
            champLevel
            visionScore
            turretKills
            totalTimeCrowdControlDealt
            doubleKills
            tripleKills
            quadraKills
            pentaKills
          }
          championId
        }
        participantIdentities {
          participantId
          player {
            summonerId
            summonerName
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

  // console.log(data);
  if (!data || loading) {
    return (
      <Spinner minHeight={document.getElementById('root')?.clientHeight} />
    );
  }
  return <Game data={data} />;
}
