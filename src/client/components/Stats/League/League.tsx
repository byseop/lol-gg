import React, { useState, useEffect, useCallback } from 'react';
import type { LeagueTypes, QueueType } from 'src/server/api/league/types';
import type { ApolloError } from 'apollo-boost';
import Spinner from '../../Layout/Spinner';
import capitalize from 'src/client/utils/capitalize';
import styled from 'styled-components';
import type { Recent10GamesStatsTypes } from '../StatsContainer';

export type LeaguePropTypes = {
  data: LeagueTypes | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  handleChangeLeague: (queueType: QueueType) => void;
  setRecent10GamesStats: React.Dispatch<
    React.SetStateAction<Recent10GamesStatsTypes[]>
  >;
};

function League({
  data,
  loading /*error*/,
  handleChangeLeague,
  setRecent10GamesStats
}: LeaguePropTypes) {
  console.log(data);
  const [selectedLeague, setSelectedLeague] = useState<QueueType | undefined>(
    'RANKED_SOLO_5x5'
  );

  const handleClickLeague = useCallback(
    (queueType: QueueType) => {
      if (selectedLeague === queueType) {
        // setSelectedLeague(undefined);
        return;
      }
      setSelectedLeague(queueType);
    },
    [selectedLeague]
  );

  useEffect(() => {
    handleChangeLeague(selectedLeague);
    setRecent10GamesStats([]);
  }, [selectedLeague, handleChangeLeague, setRecent10GamesStats]);

  useEffect(() => {
    // Initializing 'matchOption' when searched user changed
    if (!data) return;
    setSelectedLeague('RANKED_SOLO_5x5');
  }, [data]);

  return (
    <LeaguesWrap className="leagues_wrap">
      {loading && <Spinner minHeight={151} />}
      {!loading &&
        data?.league.map((league) => {
          const {
            leagueId,
            tier,
            rank,
            queueType,
            wins,
            losses,
            leaguePoints
          } = league;
          return (
            <LeagueSelector
              key={leagueId}
              className={`league ${
                selectedLeague === queueType ? 'selected' : ''
              }`}
              onClick={() => handleClickLeague(queueType)}
            >
              <picture>
                <img
                  src={`/assets/images/ranked-emblems/Emblem_${capitalize(
                    tier
                  )}.png`}
                  alt={tier}
                />
              </picture>
              <div className="league_info">
                <p>
                  <span className="tier">
                    {tier} {rank}
                  </span>
                  <span className="type">{renderRankType(queueType)}</span>
                </p>
                <p>
                  <span className="point">{leaguePoints} LP</span>
                  <span>{wins} W</span>
                  <span>{losses} L</span>
                  <span
                    className={`wr ${
                      Number(calcWinRate(wins, losses)) >= 52
                        ? 'up'
                        : Number(calcWinRate(wins, losses)) <= 48
                        ? 'down'
                        : 'normal'
                    }`}
                  >
                    {calcWinRate(wins, losses)}%
                  </span>
                </p>
              </div>
            </LeagueSelector>
          );
        })}
    </LeaguesWrap>
  );
}

export default React.memo(League);

const renderRankType = (queueType: QueueType): string => {
  switch (queueType) {
    case 'RANKED_SOLO_5x5':
      return 'Ranked Solo';
    case 'RANKED_FLEX_SR':
      return 'Ranked Team';
    default:
      return '';
  }
};

const calcWinRate = (w: number, l: number) => {
  return ((w / (w + l)) * 100).toFixed(1);
};

const LeaguesWrap = styled.div`
  /* background: #2e2651; */
  width: 300px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
`;

const LeagueSelector = styled.div`
  background: #2e2651d1;
  display: flex;
  padding: 0.8rem 1rem;
  cursor: pointer;
  box-sizing: border-box;
  transition: transform 0.2s ease-out;
  position: relative;
  z-index: 1;

  &.selected {
    box-shadow: inset 0 0 0 1px rgba(56, 198, 244);
    transform: translateZ(10px) scale(1.05, 1.05);
    z-index: 2;
  }

  picture {
    display: block;
    width: 50px;
    height: 50px;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .league_info {
    display: flex;
    flex-flow: column wrap;
    margin-left: 1.25rem;
    justify-content: center;

    p {
      & + p {
        margin-top: 0.5rem;
      }
      font-size: 12px;
      span {
        vertical-align: middle;
      }
      span.tier,
      span.point,
      span.wr {
        color: #fff;
        font-weight: 600;
        font-size: 14px;

        &.up {
          color: #8a8aff;
        }
        &.down {
          color: #e54787;
        }
      }
      span + span {
        margin-left: 11px;
        position: relative;
        &:after {
          width: 2px;
          height: 2px;
          position: absolute;
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          content: '';
          background: #c5c5c5;
          border-radius: 100%;
        }
      }
    }
  }
`;
