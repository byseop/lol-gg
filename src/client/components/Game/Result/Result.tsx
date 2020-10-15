import React, { useMemo } from 'react';
import styled from 'styled-components';
import Participant from './Participant';
import type { ResultDataType } from '../types';

type ResultPropTypes = {
  resultData: ResultDataType;
  gameVersion: string;
  gameDuration: number;
};

export default function Result({
  resultData,
  gameVersion,
  gameDuration
}: ResultPropTypes) {
  const dealingAmountRatio = useMemo(() => {
    const temp = [
      ...resultData.blue.participants,
      ...resultData.red.participants
    ].sort(
      (a, b) =>
        b.stats.totalDamageDealtToChampions -
        a.stats.totalDamageDealtToChampions
    );
    // const high = temp[0].stats.totalDamageDealtToChampions;
    // const low = temp[temp.length - 1].stats.totalDamageDealtToChampions;
    const avg =
      temp.reduce(
        (prev, cur) => cur.stats.totalDamageDealtToChampions + prev,
        0
      ) / temp.length;
    return temp.map((p, i) => ({
      participantId: p.participantId,
      ratio: (() => {
        if (i === 0) return 1; // MAX
        if (i === temp.length - 1) return 0.25; // MIN
        return parseFloat(
          (
            (((1 + 0.25) / 2) * p.stats.totalDamageDealtToChampions) /
            avg
          ).toFixed(2)
        );
      })()
    }));
  }, [resultData]);
  return (
    <ResultWrap>
      <section>
        <h3>게임 결과</h3>
        <div
          className="common-panel-style result-board"
          data-win={resultData.blue.win}
        >
          <div className="team">
            <span>BLUE TEAM</span>
            <Mark isWin={resultData.blue.win}>
              {resultData.blue.win ? 'WON' : 'LOST'}
            </Mark>
          </div>
          <div className="participants-wrap">
            {resultData.blue.participants.map((participant, index) => (
              <Participant
                key={participant.player.summonerId}
                data={participant}
                index={index}
                gameVersion={gameVersion}
                gameDuration={gameDuration}
                teamStats={resultData.blue.teamStats}
                dealingAmoutRatio={
                  dealingAmountRatio.find(
                    (p) => p.participantId === participant.participantId
                  )?.ratio as number
                }
              />
            ))}
          </div>
        </div>
        <div
          className="common-panel-style result-board"
          data-win={resultData.red.win}
        >
          <div className="team">
            <span>RED TEAM</span>
            <Mark isWin={resultData.red.win}>
              {resultData.red.win ? 'WON' : 'LOST'}
            </Mark>
          </div>
          <div className="participants-wrap">
            {resultData.red.participants.map((participant, index) => (
              <Participant
                key={participant.player.summonerId}
                data={participant}
                index={index}
                gameVersion={gameVersion}
                gameDuration={gameDuration}
                teamStats={resultData.red.teamStats}
                dealingAmoutRatio={
                  dealingAmountRatio.find(
                    (p) => p.participantId === participant.participantId
                  )?.ratio as number
                }
              />
            ))}
          </div>
        </div>
      </section>
    </ResultWrap>
  );
}

const ResultWrap = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
  }

  .result-board {
    margin-top: 1rem;
    &[data-win='true'] {
      background: linear-gradient(
        to right,
        rgba(100, 166, 208, 0.15),
        rgba(49, 41, 85, 0.5)
      );
    }

    &[data-win='false'] {
      background: linear-gradient(
        to right,
        rgba(229, 71, 135, 0.15),
        rgba(49, 41, 85, 0.5)
      );
    }

    .team {
      color: #fff;
      font-weight: bold;
      padding: 10px;
      font-size: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      position: relative;
    }

    .participants-wrap {
      box-sizing: border-box;
      padding: 0.5rem;
    }
  }
`;

const Mark = styled.div.attrs((props: { isWin: boolean }) => ({
  isWin: props.isWin
}))`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  font-weight: bold;
  background: rgba(27, 22, 56);
  padding: 5px;
  color: ${(props) =>
    props.isWin ? 'rgb(60, 189, 194)' : 'rgb(229, 71, 135)'};
`;
