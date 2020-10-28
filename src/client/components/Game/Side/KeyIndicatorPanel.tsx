import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ResponsiveBar } from '@nivo/bar';
import ChampionPortraitSVG from 'src/client/components/Stats/Matches/MatchInfo/ChampionPic/ChampionPortraitSVG';
import type { ResultDataType } from '../types';

const colors = {
  deal: 'rgba(229, 71, 135, 0.5)',
  tank: 'rgba(100, 166, 208, 0.5)',
  support: 'rgba(204,173,112, 0.5)'
};

export default function KeyIndicatorPanel({
  resultData
}: {
  resultData: ResultDataType;
}) {
  const data = useMemo(() => {
    const blue = resultData.blue.participants.reduce(
      (prev, { stats, championId }) =>
        prev.concat({
          champ: championId,
          deal: stats.totalDamageDealtToChampions,
          dealColor: 'hsl(219, 70%, 50%)',
          tank: stats.totalDamageTaken,
          support:
            stats.visionScore * 300 +
            stats.totalTimeCrowdControlDealt * 10 +
            stats.visionWardsBoughtInGame * 500
        }),
      [] as { [key: string]: number | string }[]
    );
    const red = resultData.red.participants.reduce(
      (prev, { stats, championId }) =>
        prev.concat({
          champ: championId,
          deal: stats.totalDamageDealtToChampions,
          dealColor: 'hsl(219, 70%, 50%)',
          tank: stats.totalDamageTaken,
          support:
            stats.visionScore * 300 +
            stats.totalTimeCrowdControlDealt * 10 +
            stats.visionWardsBoughtInGame * 500
        }),
      [] as { [key: string]: number | string }[]
    );
    return [...blue, ...red];
  }, [resultData]);

  return (
    <KeyIndicatorPanelWrapper>
      <div className="common-panel-style" data-win={null}>
        <h4>플레이어 영향력</h4>
        <div className="graph-wrap">
          <ResponsiveBar
            data={data}
            keys={['deal', 'tank', 'support']}
            indexBy="champ"
            layout="horizontal"
            margin={{ left: 33, right: 16, top: 16 }}
            padding={0.4}
            colors={(bar) => colors[bar.id as keyof typeof colors]}
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            axisLeft={{
              renderTick: (data: any) => (
                <ChampionPortraitSVG
                  key={data.value}
                  id={data.value}
                  size={22}
                  x={data.x}
                  y={data.y}
                />
              )
            }}
            labelFormat={(value) => value.toLocaleString()}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="white"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            borderRadius={3}
            theme={{
              grid: {
                line: {
                  stroke: '#ffffff0f'
                }
              }
            }}
            tooltipFormat={(value) => value.toLocaleString()}
          />
        </div>
      </div>
    </KeyIndicatorPanelWrapper>
  );
}

const KeyIndicatorPanelWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  > div {
    padding: 1rem;
    flex: 1;
  }

  .graph-wrap {
    height: 432px;
  }
`;
