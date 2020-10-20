import React from 'react';
import Result from './Result';
import type { ResultDataType } from '../types';
import type { Score } from '../Game';

type ResultContainerPropTypes = {
  resultData: ResultDataType;
  gameVersion: string;
  gameDuration: number;
  scores: Score[];
};

export default function ResultContainer({
  resultData,
  gameVersion,
  gameDuration,
  scores
}: ResultContainerPropTypes) {
  return (
    <Result
      resultData={resultData}
      gameVersion={gameVersion}
      gameDuration={gameDuration}
      scores={scores}
    />
  );
}
