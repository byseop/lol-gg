import React, { memo, useMemo } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import URL from 'src/client/constants/url';
import useChampionInfo from 'src/client/hooks/useChampionInfo';
import useNewestGameVersion from 'src/client/hooks/useNewestGameVersion';
import { v4 as uuidv4 } from 'uuid';

export type ChampionPicPropTypes = {
  id: number;
  useTooltip?: boolean;
  champLevel?: number;
  grade?: number;
};

function ChampionPortrait({
  id,
  useTooltip,
  isWin,
  size,
  champLevel,
  grade
}: ChampionPicPropTypes & ChampionPicStylesPropTypes) {
  const { DDRAGON, IMG, CDN } = URL;
  const version = useNewestGameVersion();
  const uuid = uuidv4();
  const champion = useChampionInfo(id);
  const convertGrade = useMemo(() => {
    if (grade === 0) return 'MVP';
    if (grade === 1) return '2nd';
    if (grade === 2) return '3rd';
    return null;
  }, [grade]);

  return (
    <ChampionPicture isWin={isWin} size={size}>
      {id > -1 ? (
        <>
          <picture data-tip data-for={uuid}>
            <img
              src={`${DDRAGON}/${CDN}/${version}/${IMG}/champion/${champion?.id}.png`}
              alt={champion?.name}
            />
          </picture>
          {useTooltip && champion?.name ? (
            <ReactTooltip id={uuid} effect="solid">
              <span className="tooltip-text">{champion.name}</span>
            </ReactTooltip>
          ) : null}
          {champLevel && (
            <div className="champ-level">
              <p>{champLevel}</p>
            </div>
          )}
          {convertGrade && <div className="grade">{convertGrade}</div>}
        </>
      ) : (
        <div className="not-select" />
      )}
    </ChampionPicture>
  );
}

export default memo(ChampionPortrait);

type ChampionPicStylesPropTypes = {
  isWin?: boolean | undefined;
  size: number;
};

const ChampionPicture = styled.span.attrs(
  (props: ChampionPicStylesPropTypes) => ({
    isWin: props.isWin,
    size: props.size
  })
)`
  position: relative;
  picture {
    display: block;
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    border-radius: 100%;
    overflow: hidden;
    box-sizing: border-box;
    border: 2px solid
      ${(props) =>
        props.isWin === undefined
          ? '#a17f3e'
          : props.isWin
          ? '#1dc49b'
          : '#e54787'};
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

    img {
      display: block;
      width: 100%;
    }
  }

  .champ-level {
    width: 14px;
    height: 14px;
    position: absolute;
    right: -2px;
    bottom: -2px;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid #a17f32;

    p {
      font-size: 0.5rem;
    }
  }

  .grade {
    justify-content: center;
    align-items: center;
    position: absolute;
    display: flex;
    right: -8px;
    top: -6px;
    color: rgb(255, 195, 6);
    background: #333;
    border: 1px solid rgb(255, 195, 6);
    font-size: 6px;
    padding: 2px;
    font-weight: bold;
    opacity: 0.7;
  }

  .not-select {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border-radius: 100%;
    background: #1c1a29;
    border: 2px solid
      ${(props) =>
        props.isWin === undefined
          ? '#a17f3e'
          : props.isWin
          ? '#1dc49b'
          : '#e54787'};
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
  }
`;
