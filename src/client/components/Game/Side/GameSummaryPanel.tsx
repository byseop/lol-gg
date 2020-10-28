import React from 'react';
import styled from 'styled-components';
import { Mark } from '../Result/Result';
import ChampionPortrait from 'src/client/components/Stats/Matches/MatchInfo/ChampionPic/ChampionPortrait';
import type { ResultDataType } from '../types';

export default function GameSummaryPanel({
  resultData
}: {
  resultData: ResultDataType;
}) {
  const { red, blue } = resultData;

  return (
    <GameSummaryPanelWrapper>
      <div className="common-panel-style">
        <div className="insights">
          <div className="team">
            <div>
              <span>BLUE TEAM</span>
              <Mark className="mark" isWin={blue.win}>
                {blue.win ? 'WON' : 'LOST'}
              </Mark>
            </div>
            <div>
              <Mark className="mark" isWin={red.win}>
                {red.win ? 'WON' : 'LOST'}
              </Mark>
              <span>RED TEAM</span>
            </div>
          </div>
          <div className="bans table-row">
            <div>
              {blue.ban.map((b) => (
                <ChampionPortrait
                  key={b.championId}
                  id={b.championId}
                  size={22}
                  useTooltip={true}
                />
              ))}
            </div>
            <span>BANS</span>
            <div>
              {red.ban.map((b) => (
                <ChampionPortrait
                  key={b.championId}
                  id={b.championId}
                  size={22}
                  useTooltip={true}
                />
              ))}
            </div>
          </div>
          <div className="kda table-row">
            <div>
              {blue.teamStats.kills} / {blue.teamStats.deaths} /{' '}
              {blue.teamStats.assists}
            </div>
            <span>KDA</span>
            <div>
              {red.teamStats.kills} / {red.teamStats.deaths} /{' '}
              {red.teamStats.assists}
            </div>
          </div>
          <div className="etc table-row">
            <div>{blue.object.towerKills}</div>
            <span>TOWER</span>
            <div>{red.object.towerKills}</div>
          </div>
          <div className="etc table-row">
            <div>{blue.object.dragonKills}</div>
            <span>DRAGON</span>
            <div>{red.object.dragonKills}</div>
          </div>
          <div className="etc table-row">
            <div>{blue.object.baronKills}</div>
            <span>BARON</span>
            <div>{red.object.baronKills}</div>
          </div>
          <div className="etc table-row">
            <div>{(blue.teamStats.gold / 1000).toFixed(1)}k</div>
            <span>GOLD</span>
            <div>{(red.teamStats.gold / 1000).toFixed(1)}k</div>
          </div>
        </div>
      </div>
    </GameSummaryPanelWrapper>
  );
}

const GameSummaryPanelWrapper = styled.div`
  margin-top: 1rem;
  .insights > div {
    padding: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    &:first-child {
      border: none;
    }
  }
  font-size: 12px;
  color: #fff;
  font-weight: bold;
  .team {
    display: flex;
    justify-content: space-between;

    span {
      vertical-align: middle;
    }

    .mark {
      position: static;
      display: inline-block;
      transform: none;
      margin: 0 10px;
    }
  }

  .table-row {
    display: flex;
    align-items: center;
    font-size: 14px;
    > span {
      font-size: 12px;
      opacity: 0.6;
      min-width: 60px;
      text-align: center;
    }

    > div {
      flex: 1;
      text-align: center;
    }

    &.bans > div {
      display: flex;
      justify-content: space-around;
    }
  }
`;
