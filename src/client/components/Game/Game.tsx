import React, { useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import Header from '../Layout/Header';
import Inner from '../Layout/Inner';
import ResultContainer from './Result';
import useNewestGameVersion from 'src/client/hooks/useNewestGameVersion';
import Side from './Side';
import type { MatchTypes, Player, Ban, Team } from 'src/server/api/match/types';
import type { ResultDataType } from './types';

type GamePropTypes = {
  data: MatchTypes;
};

export type Score = {
  playerId: number;
  score: number;
};

export type SidePanelEnum = 'GENERAL' | 'PLAYER';

export default function Game({ data }: GamePropTypes) {
  const [sidePanel, setSidePanel] = useState<SidePanelEnum>('GENERAL');
  const gameVersion = useNewestGameVersion();
  const resultData = useMemo<ResultDataType>(() => {
    const { participants, participantIdentities } = data.matchData;
    const setTeamValue = (teamId: number) => {
      const calcedParticipants = participants
        .filter((p) => p.teamId === teamId)
        .map((p) => ({
          ...p,
          player: participantIdentities.find(
            (pi) => pi.participantId === p.participantId
          )?.player as Player
        }));

      return {
        participants: calcedParticipants,
        ban: data.matchData.teams.find((team) => team.teamId === teamId)
          ?.bans as Ban[],
        win:
          data.matchData.teams.find((team) => team.teamId === teamId)?.win ===
          'Win'
            ? true
            : false,
        teamStats: {
          kills: calcedParticipants.reduce(
            (prev, cur) => prev + cur.stats.kills,
            0
          ),
          deaths: calcedParticipants.reduce(
            (prev, cur) => prev + cur.stats.deaths,
            0
          ),
          assists: calcedParticipants.reduce(
            (prev, cur) => prev + cur.stats.assists,
            0
          ),
          gold: calcedParticipants.reduce(
            (prev, cur) => prev + cur.stats.goldEarned,
            0
          )
        },
        object: data.matchData.teams.find(
          (team) => team.teamId === teamId
        ) as Team
      };
    };
    return {
      blue: setTeamValue(100),
      red: setTeamValue(200)
    };
  }, [data]);
  // console.log(resultData);

  const scores = useMemo<Score[]>(() => {
    return data.matchData.participants
      .map((player) => {
        const { stats } = player;
        const {
          kills,
          deaths,
          assists,
          visionScore,
          champLevel,
          damageDealtToTurrets,
          totalDamageDealtToChampions,
          totalDamageTaken,
          totalMinionsKilled,
          neutralMinionsKilled,
          totalHeal,
          totalTimeCrowdControlDealt,
          doubleKills,
          tripleKills,
          quadraKills,
          pentaKills
        } = stats;
        return {
          playerId: player.participantId,
          score:
            kills * 3000 -
            deaths * 4000 +
            assists * 1000 +
            champLevel * 400 +
            visionScore * 250 +
            damageDealtToTurrets * 2 +
            totalDamageDealtToChampions +
            totalDamageTaken * 0.5 +
            totalMinionsKilled * 50 +
            neutralMinionsKilled * 50 +
            totalHeal * 20 +
            totalTimeCrowdControlDealt * 50 +
            doubleKills * 1000 +
            tripleKills * 2500 +
            quadraKills * 5000 +
            pentaKills * 10000
        };
      })
      .sort((playerA, playerB) => playerB.score - playerA.score);
  }, [data]);

  const togglePanel = useCallback((type: SidePanelEnum) => {
    setSidePanel(type);
  }, []);

  return (
    <>
      <Header />
      <Inner>
        <GameWrapper>
          <ResultContainer
            resultData={resultData}
            gameVersion={gameVersion as string}
            gameDuration={data.matchData.gameDuration}
            scores={scores}
            togglePanel={togglePanel}
          />
          <Side sidePanel={sidePanel} resultData={resultData} />
        </GameWrapper>
      </Inner>
    </>
  );
}

const GameWrapper = styled.div`
  display: flex;
  margin: 0 -0.5rem;

  > div {
    margin: 0 0.5rem;
    &:first-child {
      width: 65%;
    }
    &.sides {
      flex: 1;
    }
  }

  section h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
  }

  .common-panel-style {
    box-shadow: rgba(21, 11, 37, 0.5) 0px 2px 10px 0px;
    background-color: rgba(49, 41, 85, 0.85);
    border: 1px solid rgb(59, 45, 106);
    border-radius: 4px;

    h4 {
      font-size: 12px;
    }
  }
`;
