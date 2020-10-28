import React, { useCallback } from 'react';
import styled from 'styled-components';
import GameSummaryPanel from './GameSummaryPanel';
import KeyIndicatorPanel from './KeyIndicatorPanel';
import type { SidePanelEnum } from '../Game';
import type { ResultDataType } from '../types';

type SidePropTypes = {
  sidePanel: SidePanelEnum;
  resultData: ResultDataType;
};

export default function Side({ ...props }: SidePropTypes) {
  const { sidePanel, resultData } = props;
  console.log(resultData);

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
        return;
      default:
        return null;
    }
  }, [sidePanel, resultData]);

  return (
    <SideWrapper className="sides">
      <section>
        <h3>요약 정보</h3>
        {renderPanel()}
      </section>
    </SideWrapper>
  );
}

const SideWrapper = styled.div``;
