import React from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import styled from 'styled-components';

type SpinnerOption = {
  minHeight?: number;
  spinnerColor?: string;
};
type SpinnerPropTypes = {} & SpinnerOption;

export default function Spinner({ minHeight, spinnerColor }: SpinnerPropTypes) {
  return (
    <SpinnerWrap minHeight={minHeight}>
      <RotateSpinner size={60} color={spinnerColor ? spinnerColor : '#c5c5c5'} />
    </SpinnerWrap>
  );
}

const SpinnerWrap = styled.div.attrs((props: SpinnerOption) => ({
  minHeight: props.minHeight
}))`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.minHeight ? `${props.minHeight}px` : undefined};
`;
