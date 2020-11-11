import React from 'react';
import Result from './Result';
import type { ParticipantDataType, ResultDataType } from '../types';
import type { Score, SidePanelEnum } from '../Game';

type ResultContainerPropTypes = {
  resultData: ResultDataType;
  gameVersion: string;
  gameDuration: number;
  scores: Score[];
  togglePanel: ({
    type,
    data
  }: {
    type: SidePanelEnum;
    data: ParticipantDataType;
  }) => void;
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
