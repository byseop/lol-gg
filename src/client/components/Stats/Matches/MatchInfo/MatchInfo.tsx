import React, { useMemo, useEffect } from 'react';
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
  Rune,
  Champion
} from 'src/server/api/data/types';
import type { Recent10GamesStatsTypes } from '../../StatsContainer';
import type { ItemsData } from 'src/server/api/data/types';
import SlotContainer from './Slot';

type MatchInfoPropTypes = {
  data: MatchTypes | undefined;
  loading: boolean;
  encryptedSummonerId: string;
  gameDataState: GameData | null;
  index: number;
  setRecent10GamesStats: React.Dispatch<
    React.SetStateAction<Recent10GamesStatsTypes[]>
  >;
};

function MatchInfo({
  data,
  loading,
  encryptedSummonerId,
  gameDataState,
  index,
  setRecent10GamesStats
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
        timeline: temp.timeline,
        items: []
      },
      stats: temp.stats
    };
  }, [data, playerPID, gameDataState]);
  console.log(data);
  console.log(player);
  console.log(gameDataState?.gameData);

  useEffect(() => {
    if (player) {
      setRecent10GamesStats((prev) => {
        return [
          ...prev,
          {
            champ: player.info.champ as Champion,
            kda: {
              kills: player.stats.kills,
              deaths: player.stats.deaths,
              assists: player.stats.assists
            }
          }
        ];
      });
    }
  }, [setRecent10GamesStats, player]);

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
            <span>Patch: {data.matchData.gameVersion.slice(0, 5)}</span>
          </div>
          <div className="match_info">
            <div className="champ">
              <picture data-tip data-for={`matchChamp-${index}`}>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${data.matchData.gameVersion.slice(
                    0,
                    5
                  )}.1/img/champion/${player.info.champ?.id}.png`}
                  alt={player.info.champ?.id}
                />
              </picture>
              <ReactTooltip id={`matchChamp-${index}`} effect="solid">
                <span className="tooltip-text">{player.info.champ?.name}</span>
              </ReactTooltip>
              <div className="lane">
                {player.info.timeline.lane !== 'NONE' &&
                  data.matchData.queueId !== 450 && (
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
                          src={`https://ddragon.leagueoflegends.com/cdn/${gameDataState?.gameData.version}/img/spell/${spell.id}.png`}
                          alt={spell.id}
                        />
                      </picture>
                      <ReactTooltip
                        id={`spell-${index}-${spell.id}`}
                        effect="solid"
                      >
                        <span className="tooltip-text">{spell.name}</span>
                      </ReactTooltip>
                    </div>
                  ))}
                </div>
                <div className="rune">
                  {player.info.runes.map((rune) => (
                    <div key={`${index}-${rune.id}`}>
                      <picture data-tip data-for={`rune-${index}-${rune.id}`}>
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                          alt={rune.name}
                        />
                      </picture>
                      <ReactTooltip
                        id={`rune-${index}-${rune.id}`}
                        effect="solid"
                      >
                        <span className="tooltip-text">{rune.name}</span>
                      </ReactTooltip>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="player_stats">
              <div className="text_line">
                <b>{player.stats.kills}</b> / <b>{player.stats.deaths}</b> /{' '}
                <b>{player.stats.assists}</b>
              </div>
              <div className="text_line">
                <b>
                  {(
                    (player.stats.kills + player.stats.assists) /
                    player.stats.deaths
                  ).toFixed(2)}{' '}
                </b>
                KDA
              </div>
              <div className="text_line">
                <b>
                  {player.stats.totalMinionsKilled} (
                  {(
                    player.stats.totalMinionsKilled /
                    Number((data.matchData.gameDuration / 60).toFixed(0))
                  ).toFixed(1)}
                  )
                </b>{' '}
                CS
              </div>
            </div>
            {data.matchData.queueId !== 450 && (
              <div className="player_stats">
                <div className="text_line" data-tip data-for={`ward-${index}`}>
                  <b>
                    {player.stats.wardsPlaced} (
                    {player.stats.visionWardsBoughtInGame})
                  </b>{' '}
                  / <b>{player.stats.wardsKilled}</b> WARD
                  <ReactTooltip id={`ward-${index}`}>
                    <span>설치한 와드 (제어 와드) / 제거한 와드</span>
                  </ReactTooltip>
                </div>
                {player.info.timeline.csDiffPerMinDeltas && (
                  <div className="text_line">
                    <b
                      style={{
                        color:
                          Number(
                            player.info.timeline.csDiffPerMinDeltas[
                              '0-10'
                            ].toFixed(1)
                          ) > 0
                            ? '#1DC49B'
                            : '#E54787'
                      }}
                    >
                      {player.info.timeline.csDiffPerMinDeltas['0-10'].toFixed(
                        1
                      )}
                    </b>{' '}
                    CS @ 10m
                  </div>
                )}
                {player.info.timeline.goldPerMinDeltas && (
                  <div className="text_line">
                    <b
                      style={{
                        color:
                          Number(
                            player.info.timeline.goldPerMinDeltas[
                              '0-10'
                            ].toFixed(0)
                          ) > 0
                            ? '#1DC49B'
                            : '#E54787'
                      }}
                    >
                      {player.info.timeline.goldPerMinDeltas['0-10'].toFixed(0)}
                    </b>{' '}
                    GOLD @ 10m
                  </div>
                )}
              </div>
            )}
            <div className="stats_square_slot">
              <div className="stats_square_wrap">
                <div className="items">
                  {[
                    player.stats.item0,
                    player.stats.item1,
                    player.stats.item2,
                    player.stats.item3,
                    player.stats.item4,
                    player.stats.item5,
                    player.stats.item6
                  ].map((item, index) => (
                    <SlotContainer
                      key={`${index}-${item}`}
                      id={item}
                      index={index}
                      gameVersion={gameDataState?.gameData.version as string}
                      data={
                        gameDataState?.gameData.items &&
                        gameDataState?.gameData.items[
                          item.toString() as keyof ItemsData[]
                        ]
                      }
                      type={'item'}
                    />
                  ))}
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
      flex-flow: column wrap;
      justify-items: center;
      align-items: center;
      > picture {
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 100%;
        overflow: hidden;
        box-sizing: border-box;
        border: 2px solid ${(props) => (props.isWin ? '#1dc49b' : '#e54787')};
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
      display: flex;
      align-items: center;
      .stats_square_wrap {
        display: flex;
        flex-wrap: wrap;
        margin: -4px;
        box-sizing: border-box;
        > div {
          display: flex;
          flex-flow: column wrap;
          > div {
            width: 34px;
            height: 34px;
            margin: 4px;
            border-radius: 4px;
            overflow: hidden;
            background: rgba(25, 20, 54, 0.7);
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            picture {
              display: block;
              height: 100%;
              img {
                display: block;
                width: 100%;
              }
            }
          }
        }

        .rune > div:nth-child(2) {
          picture {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 75%;
            }
          }
        }

        .items {
          height: 84px;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .player_stats {
      display: flex;
      justify-content: center;
      flex-flow: column wrap;
      margin-left: 2rem;
      font-size: 12px;
      .text_line {
        vertical-align: middle;

        b {
          font-weight: bold;
          font-size: 14px;
          color: #fff;
          vertical-align: baseline;
        }
        & + .text_line {
          margin-top: 8px;
        }
      }
    }
  }

  .tooltip-text {
    color: #fff !important;
    font-size: 14px;
  }
`;
