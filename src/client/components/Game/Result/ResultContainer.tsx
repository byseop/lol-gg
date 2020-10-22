import React from 'react';
import Result from './Result';
import type { ResultDataType } from '../types';
import type { Score, SidePanelEnum } from '../Game';

type ResultContainerPropTypes = {
  resultData: ResultDataType;
  gameVersion: string;
  gameDuration: number;
  scores: Score[];
  togglePanel: (type: SidePanelEnum) => void;
};

export default function ResultContainer({
  resultData,
  gameVersion,
  gameDuration,
  scores,
  togglePanel
}: ResultContainerPropTypes) {
  return (
    <Result
      resultData={resultData}
      gameVersion={gameVersion}
      gameDuration={gameDuration}
      scores={scores}
      togglePanel={togglePanel}
    />
  );
}
