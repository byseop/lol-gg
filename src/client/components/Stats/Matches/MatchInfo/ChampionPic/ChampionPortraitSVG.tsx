import React, { memo } from 'react';
import URL from 'src/client/constants/url';
import useChampionInfo from 'src/client/hooks/useChampionInfo';
import useNewestGameVersion from 'src/client/hooks/useNewestGameVersion';

export type ChampionPicPropTypes = {
  id: number;
  size: number;
  x: number;
  y: number;
};

function ChampionPortraitSVG({ id, size, x, y }: ChampionPicPropTypes) {
  const { DDRAGON, IMG, CDN } = URL;
  const version = useNewestGameVersion();
  const champion = useChampionInfo(id);

  if (id > -1) {
    return (
      <g transform={`translate(${x - size / 2 - 20}, ${y - size / 2})`}>
        <image
          xlinkHref={`${DDRAGON}/${CDN}/${version}/${IMG}/champion/${champion?.id}.png`}
          width={size}
          height={size}
        />
      </g>
    );
  }

  return null;
}

export default memo(ChampionPortraitSVG);
