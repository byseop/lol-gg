import React, { useCallback } from 'react';
import type { MatchDataTypes } from '../types';
import styled from 'styled-components';
import MatchInfoContainer from './MatchInfo';
import Spinner from '../../Layout/Spinner';
import type {
  GameData,
  SummonerSpell,
  RunesReforged,
  Rune,
  Champion
} from 'src/server/api/data/types';
import type { Timeline } from 'src/server/api/match/types';
import type { MatchTypes, Stats, Participant, ParticipantIdentity } from 'src/server/api/match/types';

export type MatchesPropTypes = {
  matchData: MatchDataTypes[] | undefined;
  matchLoading: boolean;
  encryptedSummonerId: string;
  gameDataState: GameData | null;
};

export type MatchInfoTypes = {
  player: {
    info: {
      spells: SummonerSpell[];
      champ: Champion;
      runes: [Rune, RunesReforged];
      timeline: Timeline;
      items: any[]
    };
    stats: Stats;
  };
  participants: {
    team100: ((Participant & ParticipantIdentity) | null)[];
    team200: ((Participant & ParticipantIdentity) | null)[];
  };
}

function Matches({
  matchData,
  matchLoading,
  encryptedSummonerId,
  gameDataState,
}: MatchesPropTypes) {
  const getGameInfoes = useCallback(({ data, playerPID }:
    { data: MatchTypes; playerPID: number | undefined }): MatchInfoTypes | undefined => {
    // console.log(gameDataState);
    if (!data || playerPID === undefined || !gameDataState) return undefined;
    const temp = data.matchData.participants.find(p => p.participantId === playerPID);
    if (!temp) return undefined;
    const spells: SummonerSpell[] = [temp.spell1Id, temp.spell2Id].reduce(
      (acc, cur) =>
        acc.concat(
          gameDataState.gameData.spells?.find((s) => s.key === cur.toString())
        ),
      [] as any
    );
    const champ = gameDataState.gameData.champs?.find(
      (c) => c.key === temp.championId.toString()
    ) as Champion;
    const primaryRune = gameDataState.gameData.runes
      ?.find((reforged) => reforged.id === temp?.stats.perkPrimaryStyle)
      ?.slots[0].runes.find(
        (primary) => primary.id === temp?.stats.perk0
      ) as Rune;
    const secondaryRune = gameDataState.gameData.runes?.find(
      (reforged) => reforged.id === temp?.stats.perkSubStyle
    ) as RunesReforged;
    const runes: [Rune, RunesReforged] = [primaryRune, secondaryRune];
    const participants = (() => {
      let temp: ((Participant & ParticipantIdentity) | null)[] = [];
      for (let i = 0; i < 10; i++) {
        if (data && data.matchData.participantIdentities) {
          temp.push({
            ...data.matchData.participantIdentities[i],
            ...data.matchData.participants[i]
          });
        }
      }
      return temp.reduce(
        (acc, cur) => {
          if (cur?.teamId === 100) {
            return {
              ...acc,
              team100: acc.team100.concat(cur)
            };
          }
          return {
            ...acc,
            team200: acc.team200.concat(cur)
          };
        },
        { team100: [], team200: [] } as {
          team100: ((Participant & ParticipantIdentity) | null)[];
          team200: ((Participant & ParticipantIdentity) | null)[];
        }
      );
    })();

    return {
      player: {
        info: {
          spells,
          champ,
          runes,
          timeline: temp.timeline,
          items: []
        },
        stats: temp.stats
      },
      participants
    };
  }, [gameDataState]);

  return (
    <MatchesWrap>
      {matchLoading && !matchData && <Spinner />}
      {matchData?.map((match: MatchDataTypes, i) => (
        <MatchInfoContainer
          key={match.gameId}
          gameId={match.gameId}
          encryptedSummonerId={encryptedSummonerId}
          gameDataState={gameDataState}
          index={i}
          getGameInfoes={getGameInfoes}
        />
      ))}
      {matchLoading && matchData && <Spinner minHeight={160} />}
    </MatchesWrap>
  );
}

export default React.memo(Matches);

const MatchesWrap = styled.div`
  margin-left: 1rem;
  flex: 1;
`;
