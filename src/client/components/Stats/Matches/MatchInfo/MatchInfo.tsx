import React, { useMemo } from 'react';
import styled from 'styled-components';
import Spinner from 'src/client/components/Layout/Spinner';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import capitalize from 'src/client/utils/capitalize';
import type { MatchTypes } from 'src/server/api/match/types';
import type {
  GameData,
  SummonerSpell,
  RunesReforged,
  Rune
} from 'src/server/api/data/types';

type MatchInfoPropTypes = {
  data: MatchTypes | undefined;
  loading: boolean;
  encryptedSummonerId: string;
  gameDataState: GameData | null;
  index: number;
};

function MatchInfo({
  data,
  loading,
  encryptedSummonerId,
  gameDataState,
  index
}: MatchInfoPropTypes) {
  const playerPID = useMemo(() => {
    if (!data) return undefined;
    return data.matchData.participantIdentities.find(
      (p) => p.player.summonerId === encryptedSummonerId
    )?.participantId;
  }, [data, encryptedSummonerId]);

  const player = useMemo(() => {
    if (!data || !playerPID || !gameDataState) return undefined;
    const temp = data.matchData.participants.find(
      (p) => p.participantId === playerPID
    );
    if (!temp) return undefined;
    const champ = gameDataState.gameData.champs?.find(
      (c) => c.key === temp.championId.toString()
    );
    const spells: SummonerSpell[] = [temp.spell1Id, temp.spell2Id].reduce(
      (acc, cur) =>
        acc.concat(
          gameDataState.gameData.spells?.find((s) => s.key === cur.toString())
        ),
      [] as any
    );
    const primaryRune = gameDataState.gameData.runes
      ?.find((reforged) => reforged.id === temp?.stats.perkPrimaryStyle)
      ?.slots[0].runes.find(
        (primary) => primary.id === temp?.stats.perk0
      ) as Rune;
    const secondaryRune = gameDataState.gameData.runes?.find(
      (reforged) => reforged.id === temp?.stats.perkSubStyle
    ) as RunesReforged;
    const runes: [Rune, RunesReforged] = [primaryRune, secondaryRune];

    return {
      info: {
        spells,
        champ,
        runes,
        timeline: temp.timeline
      },
      stats: temp.stats
    };
  }, [data, playerPID, gameDataState]);

  console.log(data, player);

  return (
    <MatchInfoDiv isWin={player?.stats.win}>
      {loading && <Spinner />}
      {!loading && data && player && (
        <div className="match_info_wrap">
          <div className="info_head">
            <span className="game_type">
              {renderGameType(data.matchData.queueId)}
            </span>
            <span className="game_created_time">
              {moment(data.matchData.gameCreation).fromNow()}
            </span>
            <span className="game_duration">
              {(data.matchData.gameDuration / 60).toFixed(0)}분
            </span>
          </div>
          <div className="match_info">
            <div className="champ">
              <picture data-tip data-for={`matchChamp-${index}`}>
                <img
                  src={`http://ddragon.leagueoflegends.com/cdn/10.14.1/img/champion/${player.info.champ?.id}.png`}
                  alt={player.info.champ?.id}
                />
              </picture>
              <ReactTooltip id={`matchChamp-${index}`} effect="solid">
                <span className="tooltip-text">{player.info.champ?.name}</span>
              </ReactTooltip>
              <div className="lane">
                {player.info.timeline.lane !== 'NONE' && (
                  <picture>
                    <img
                      src={`/assets/images/ranked-positions/Position_Diamond-${capitalize(
                        player.info.timeline.lane
                      )}.png`}
                      alt={player.info.timeline.lane}
                    />
                  </picture>
                )}
                <span>{player.info.timeline.lane}</span>
              </div>
            </div>
            <div className="stats_square_slot">
              <div className="stats_square_wrap">
                <div className="spell">
                  {player.info.spells?.map((spell) => (
                    <div key={`${index}-${spell.id}`}>
                      <picture data-tip data-for={`spell-${index}-${spell.id}`}>
                        <img
                          src={`http://ddragon.leagueoflegends.com/cdn/10.14.1/img/spell/${spell.id}.png`}
                          alt={spell.id}
                        />
                      </picture>
                      <ReactTooltip
                        id={`spell-${index}-${spell.id}`}
                        effect="solid"
                      >
                        <span className="tooltip-text">{spell.name}</span>
                      </ReactTooltip>xp
                    </div>
                  ))}
                </div>
                <div className="rune">
                  {
                    player.info.runes.map(rune => (
                      <div key={`${index}-${rune.id}`}>
                        <picture data-tip data-for={`rune-${index}-${rune.id}`}>
                          <img
                            src={`http://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                            alt={rune.name}
                          />
                        </picture>
                        <ReactTooltip
                          id={`rune-${index}-${rune.id}`}
                          effect="solid"
                        >
                          <span className="tooltip-text">{rune.name}</span>
                        </ReactTooltip>xp
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </MatchInfoDiv>
  );
}

export default React.memo(MatchInfo);

const renderGameType = (queueType: number) => {
  switch (queueType) {
    case 440:
      return 'RANKED TEAM';
    case 420:
      return 'RANKED SOLO';
    case 450:
      return 'ARAM';
    default:
      return '';
  }
};

type MatchInfoStylePropTypes = {
  isWin: boolean;
};

const MatchInfoDiv = styled.div.attrs((props: MatchInfoStylePropTypes) => ({
  isWin: props.isWin
}))`
  & + & {
    margin-top: 1rem;
  }
  padding: 1rem;
  background: ${(props) =>
    props.isWin
      ? 'linear-gradient(90deg, rgba(97, 152, 164, 0.6) 0%, rgba(49, 41, 85, 0.7) 100%)'
      : props.isWin === undefined
      ? '#2e2651d1'
      : 'linear-gradient(90deg, rgba(201, 103, 143, 0.6) 0%, rgba(49, 41, 85, 0.7) 100%)'};
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);

  .info_head {
    font-size: 12px;

    span {
      vertical-align: middle;
    }

    span + span {
      margin-left: 1rem;
    }

    .game_type {
      color: #fff;
      font-weight: 500;
    }
  }

  .match_info {
    display: flex;
    margin-top: 1rem;

    .champ {
      display: flex;
      width: 72px;
      flex-flow: column;
      justify-items: center;
      align-items: center;
      > picture {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        overflow: hidden;
        box-sizing: border-box;
        border: 2px solid ${(props) => (props.isWin ? '#e54787' : '#1dc49b')};
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

        img {
          display: block;
          width: 100%;
        }
      }
    }

    .lane {
      display: flex;
      justify-content: center;
      justify-items: flex-start;
      align-items: center;
      margin-top: 0.75rem;
      font-size: 10px;
      background: rgba(25, 20, 54, 0.7);
      padding: 0.25rem 0.55rem;
      border-radius: 3px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

      picture {
        display: block;
        width: 12px;
        height: 12px;

        img {
          display: block;
          width: 100%;
        }
      }

      picture + span {
        margin-left: 0.3rem;
      }
    }

    .stats_square_slot {
      margin-left: 2rem;
      .stats_square_wrap {
        display: flex;
        margin: -4px;
        box-sizing: border-box;
        > div {
          display: flex;
          flex-flow: column;
          > div {
            width: 34px;
            height: 34px;
            margin: 4px;
            border-radius: 4px;
            overflow: hidden;
            background: rgba(25, 20, 54, 0.7);
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

            img {
              display: block;
              width: 100%;
            }
          }
        }
      }
    }
  }

  .tooltip-text {
    color: #fff !important;
    font-size: 14px;
  }
`;
