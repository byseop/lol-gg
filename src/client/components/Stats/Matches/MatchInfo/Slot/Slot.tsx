import React from 'react';
import ReactTooltip from 'react-tooltip';

export type SlotPropTypes = {
  index: number;
  gameVersion: string;
  data: any;
  type: string;
  id: string | number;
};

function Slot({ index, gameVersion, data, type, id }: SlotPropTypes) {
  return (
    <div>
      {id ? (
        <>
          <picture data-tip data-for={`${type}-${index}-${id}`}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/${gameVersion}/img/${type}/${id}.png`}
              alt={String(id)}
            />
          </picture>

          <ReactTooltip id={`${type}-${index}-${id}`} effect="solid">
            <span className="tooltip-text">{data.name}</span>
          </ReactTooltip>
        </>
      ) : null}
    </div>
  );
}

export default React.memo(Slot);
