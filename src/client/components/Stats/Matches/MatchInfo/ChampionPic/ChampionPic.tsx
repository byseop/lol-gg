import React, { memo, useMemo } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

export type ChampionPicPropTypes = {
  image: string;
  index: number;
  name?: string | undefined;
  id?: string | undefined;
  useTooltip?: boolean;
  champLevel?: number;
  grade?: number;
};

function ChampionPic({
  image,
  index,
  name,
  useTooltip,
  isWin,
  size,
  champLevel,
  grade
}: ChampionPicPropTypes & ChampionPicStylesPropTypes) {
  const convertGrade = useMemo(() => {
    if (grade === 0) return 'MVP';
    if (grade === 1) return '2nd';
    if (grade === 2) return '3rd';
    return null;
  }, [grade]);

  return (
    <ChampionPicture isWin={isWin} size={size}>
      <picture data-tip data-for={`matchChamp-${index}`}>
        <img src={image} alt={name} />
      </picture>
      {useTooltip && name ? (
        <ReactTooltip id={`matchChamp-${index}`} effect="solid">
          <span className="tooltip-text">{name}</span>
        </ReactTooltip>
      ) : null}
      {champLevel && (
        <div className="champ-level">
          <p>{champLevel}</p>
        </div>
      )}
      {convertGrade && <div className="grade">{convertGrade}</div>}
    </ChampionPicture>
  );
}

export default memo(ChampionPic);

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
`;
