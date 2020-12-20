import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import GameSummaryPanel from './GameSummaryPanel';
import KeyIndicatorPanel from './KeyIndicatorPanel';
import RunePanel from './RunePanel';
import type { SidePanelEnum } from '../Game';
import type { ParticipantDataType, ResultDataType } from '../types';

type SidePropTypes = {
  sidePanel: SidePanelEnum;
  resultData: ResultDataType;
  selectedPlayer: ParticipantDataType | undefined;
};

export default function Side({ ...props }: SidePropTypes) {
  const { sidePanel, resultData, selectedPlayer } = props;

  const runeData = useMemo(() => {
    if (!selectedPlayer) return null;
    const { stats } = selectedPlayer;
    const {
      perk0,
      perk1,
      perk2,
      perk3,
      perk4,
      perkPrimaryStyle,
      perkSubStyle
    } = stats;
    return {
      perk0,
      perk1,
      perk2,
      perk3,
      perk4,
      perkPrimaryStyle,
      perkSubStyle
    };
  }, [selectedPlayer]);

  const renderPanel = useCallback(() => {
    switch (sidePanel) {
      case 'GENERAL':
        return (
          <>
            <GameSummaryPanel resultData={resultData} />
            <KeyIndicatorPanel resultData={resultData} />
          </>
        );
      case 'PLAYER':
        return (
          <>
            <RunePanel runeData={runeData} />
          </>
        );
      default:
        return null;
    }
  }, [sidePanel, resultData, runeData]);

  return (
    <SideWrapper className="sides">
      <section>
        {sidePanel === 'GENERAL' && <h3>요약 정보</h3>}
        {sidePanel === 'PLAYER' && (
          <h3>
            <b>{selectedPlayer?.player.summonerName}</b> 의 인게임 정보
          </h3>
        )}
        {renderPanel()}
      </section>
    </SideWrapper>
  );
}

const SideWrapper = styled.div`
  section > h3 {
    b {
      color: rgb(204, 173, 112);
    }
  }
`;
