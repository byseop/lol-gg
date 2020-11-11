import React from 'react';
import styled from 'styled-components';
import type { Stats } from 'src/server/api/match/types';

type RunePanelPropTypes = {
  runeData: { [key: string]: Stats[keyof Stats] } | null;
};

export default function RunePanel({ runeData }: RunePanelPropTypes) {
  console.log(runeData);
  if (!runeData) return null;
  const { perkPrimaryStyle } = runeData;
  return (
    <RunePanelWrapper primaryStyle={perkPrimaryStyle as number}>
      <div className="common-panel-style" data-win={null}>
        <div className="rune-bg" />
        <h4>룬</h4>
      </div>
    </RunePanelWrapper>
  );
}

const RunePanelWrapper = styled.div.attrs(
  (props: { primaryStyle: number }) => ({ primaryStyle: props.primaryStyle })
)`
  margin-top: 1rem;

  > div {
    height: 400px;
    position: relative;

    h4 {
      text-align: center;
    }
  }

  .rune-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: ${(props) =>
      `url(/assets/images/runeBg/bg-${props.primaryStyle}.jpg)`};
    background-size: auto 100%;
    background-position: right 30% center;
    z-index: -1;
  }
`;
