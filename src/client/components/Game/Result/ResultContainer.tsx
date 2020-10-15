import React from 'react';
import Result from './Result';
import type { ResultDataType } from '../types';

type ResultContainerPropTypes = {
  resultData: ResultDataType;
  gameVersion: string;
  gameDuration: number;
};

export default function ResultContainer({
  resultData,
  gameVersion,
  gameDuration
}: ResultContainerPropTypes) {
  return (
    <Result
      resultData={resultData}
      gameVersion={gameVersion}
      gameDuration={gameDuration}
    />
  );
}
