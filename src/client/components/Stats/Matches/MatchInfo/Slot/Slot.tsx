import React from 'react';
import ReactTooltip from 'react-tooltip';

export type SlotPropTypes = {
  index: number;
  data: any;
  type: string;
  id: string | number;
  image: string;
};

function Slot({ index, data, type, id, image }: SlotPropTypes) {
  return (
    <div>
      {id ? (
        <>
          <picture data-tip data-for={`${type}-${index}-${id}`}>
            <img
              src={image}
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
