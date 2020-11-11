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
          tank: stats.totalDamageTaken,
          support:
            stats.visionScore * 300 +
            stats.totalTimeCrowdControlDealt * 10 +
            stats.visionWardsBoughtInGame * 500
        }),
      [] as { [key: string]: number | string }[]
    );
    return { blue, red };
  }, [resultData]);

  const maxValue = useMemo(() => {
    const temp = [...data.blue, ...data.red];
    temp.sort(
      (a, b) =>
        (b.deal as number) +
        (b.tank as number) +
        (b.support as number) -
        ((a.deal as number) + (a.tank as number) + (a.support as number))
    );
    return (
      (temp[0].deal as number) +
      (temp[0].tank as number) +
      (temp[0].support as number)
    );
  }, [data]);

  return (
    <KeyIndicatorPanelWrapper>
      <div className="common-panel-style" data-win={null}>
        <h4>플레이어 캐리력</h4>
        <div className="graph-wrap">
          <div className="blue">
            <ResponsiveBar
              data={data.blue}
              keys={['deal', 'tank', 'support']}
              indexBy="champ"
              layout="horizontal"
              margin={{ left: 33, top: 16 }}
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
              labelSkipWidth={28}
              labelTextColor="white"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              theme={{
                grid: {
                  line: {
                    stroke: '#ffffff0f'
                  }
                }
              }}
              tooltipFormat={(value) => value.toLocaleString()}
              maxValue={maxValue}
            />
          </div>
          <div className="red">
            <ResponsiveBar
              data={data.red}
              keys={['deal', 'tank', 'support']}
              indexBy="champ"
              layout="horizontal"
              margin={{ right: 33, top: 16 }}
              padding={0.4}
              colors={(bar) => colors[bar.id as keyof typeof colors]}
              axisTop={null}
              axisLeft={null}
              axisBottom={null}
              axisRight={{
                renderTick: (data: any) => (
                  <ChampionPortraitSVG
                    key={data.value}
                    id={data.value}
                    size={22}
                    x={data.x}
                    y={data.y}
                    team={'red'}
                  />
                )
              }}
              labelFormat={(value) => value.toLocaleString()}
              labelSkipWidth={28}
              labelTextColor="white"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              theme={{
                grid: {
                  line: {
                    stroke: '#ffffff0f'
                  }
                }
              }}
              tooltipFormat={(value) => value.toLocaleString()}
              reverse={true}
            />
          </div>
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
    display: flex;
    height: 240px;
    > div {
      flex: 1;
    }
  }
`;
