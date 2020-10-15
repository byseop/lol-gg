import React, { useMemo } from 'react';
import styled from 'styled-components';
import Header from '../Layout/Header';
import Inner from '../Layout/Inner';
import ResultContainer from './Result';
import useNewestGameVersion from 'src/client/hooks/useNewestGameVersion';
import type { MatchTypes, Player, Ban } from 'src/server/api/match/types';
import type { ResultDataType } from './types';

type GamePropTypes = {
  data: MatchTypes;
};

export default function Game({ data }: GamePropTypes) {
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
          )
        }
      };
    };
    return {
      blue: setTeamValue(100),
      red: setTeamValue(200)
    };
  }, [data]);
  // console.log(resultData);

  return (
    <>
      <Header />
      <Inner>
        <GameWrapper>
          <ResultContainer
            resultData={resultData}
            gameVersion={gameVersion as string}
            gameDuration={data.matchData.gameDuration}
          />
          <div className="sides"></div>
        </GameWrapper>
      </Inner>
    </>
  );
}

const GameWrapper = styled.div`
  display: flex;
  margin: 0 -1rem;

  > div {
    margin: 0 1rem;
    &:first-child {
      width: 65%;
    }
    &.sides {
      flex: 1;
    }
  }

  .common-panel-style {
    box-shadow: rgba(21, 11, 37, 0.5) 0px 2px 10px 0px;
    background-color: rgba(49, 41, 85, 0.85);
    border: 1px solid rgb(59, 45, 106);
    border-radius: 4px;
  }
`;
