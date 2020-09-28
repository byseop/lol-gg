import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

export type ChampionPicPropTypes = {
  image: string;
  index: number;
  name?: string | undefined;
  id?: string | undefined;
  useTooltip?: boolean;
};

export default function ChampionPic({
  image,
  index,
  name,
  useTooltip,
  isWin,
  size
}: ChampionPicPropTypes & ChampionPicStylesPropTypes) {
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
    </ChampionPicture>
  );
}

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
`;
